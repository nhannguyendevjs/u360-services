import * as JwtSchema from '../../../schemas/jwt.schema.mjs';
import * as JWT from '../../../services/jwt/jwt.mjs';
import * as Crypto from '../../../utils/crypto/crypto.mjs';
import * as PostgresService from '../../../services/postgres/postgres.mjs';

const verifyAccessToken = async (req) => {
  try {
    const accessToken = req.headers.authorization;
    const { success, data, error } = await JWT.verifyAccessToken(accessToken);

    if (success) {
      const user = (await PostgresService.client.query('SELECT * FROM users WHERE id = $1', [data.payload.userId])).rows[0];

      delete user.accountId;

      return user;
    } else {
      throw error;
    }
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

const signUpAccount = async (req) => {
  try {
    const payload = req.body;
    const { success, error } = AccountsSchema.AccountSignUpSchema.safeParse(payload);

    if (success) {
      const account = { username: payload.username, password: Crypto.encrypt(payload.password).data };
      const accountId = (await PostgresService.client.query('INSERT INTO accounts (username, password) VALUES ($1, $2) RETURNING id', [account.username, account.password])).rows[0]
        .id;
      const user = {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        address: payload.address,
        role: payload.role,
        accountId,
      };
      const userId = (
        await PostgresService.client.query('INSERT INTO users (name, email, phone, address, role, account_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', [
          user.name,
          user.email,
          user.phone,
          user.address,
          user.role,
          user.accountId,
        ])
      ).rows[0].id;

      return { id: userId };
    } else {
      throw error;
    }
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

const signInAccount = async (req) => {
  try {
    let hasError = false;

    const payload = req.body;
    const { success, error } = AccountsSchema.AccountSignInSchema.safeParse(payload);

    if (success) {
      const account = (await PostgresService.client.query('SELECT * FROM accounts WHERE username = $1', [payload.username])).rows[0];

      if (account) {
        const user = (await PostgresService.client.query('SELECT * FROM users WHERE account_id = $1', [account.id])).rows[0];
        delete user.accountId;

        const password = Crypto.decrypt(account.password).data;

        if (password === payload.password) {
          const tokenPayload = {
            userId: user.id,
            username: account.username,
            password: account.password,
          };

          let accessToken = '';
          let refreshToken = '';

          // Generate new access token
          {
            const { success, data, error } = JWT.generateAccessToken(tokenPayload);
            if (success) {
              accessToken = data;
            } else {
              throw error;
            }
          }

          // Generate new refresh token
          {
            const { success, data, error } = JWT.generateRefreshToken(tokenPayload);
            if (success) {
              refreshToken = data;
            } else {
              throw error;
            }
          }

          return {
            accessToken,
            refreshToken,
            user,
          };
        } else {
          hasError = true;
        }
      } else {
        hasError = true;
      }

      if (hasError) {
        throw new Error('Invalid username or password.');
      }
    } else {
      throw error;
    }
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

const refreshAccessToken = async (req) => {
  try {
    const refreshToken = req.cookies.jwt;

    if (refreshToken) {
      const { success, data, error } = await JWT.verifyRefreshToken(refreshToken);

      if (success) {
        let accessToken = '';
        let refreshToken = '';
        let { payload } = data;

        // Parse payload
        payload = JwtSchema.JwtSignPayloadSchema.parse(payload);

        // Generate new access token
        {
          const { success, data, error } = JWT.generateAccessToken(payload);
          if (success) {
            accessToken = data;
          } else {
            throw error;
          }
        }

        // Generate new refresh token
        {
          const { success, data, error } = JWT.generateRefreshToken(payload);
          if (success) {
            refreshToken = data;
          } else {
            throw error;
          }
        }

        return { accessToken, refreshToken };
      } else {
        throw error;
      }
    }
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export { refreshAccessToken, signInAccount, signUpAccount, verifyAccessToken };
