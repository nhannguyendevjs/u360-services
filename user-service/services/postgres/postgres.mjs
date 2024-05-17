import { Connection } from 'postgresql-client';
import { PostgresConfigs } from '../../app.config.mjs';
import { Logger } from '../../services/logger/logger.mjs';

const client = new Connection(PostgresConfigs.POSTGRES_URI);

const connect = async () => {
  if (PostgresConfigs.ENABLE_POSTGRES && client) {
    await client.connect();
  }
};

const close = async () => {
  if (PostgresConfigs.ENABLE_POSTGRES && client) {
    await client.close();
  }
};

const bootstrap = async () => {
  if (PostgresConfigs.ENABLE_POSTGRES) {
    try {
      await connect();
      Logger.log('info', `Postgres is ready to use`);
    } catch (error) {
      Logger.log('error', `Can't connect to Postgres due to: ${JSON.stringify(error)}`);
    }
  }
};

export { bootstrap, close, connect, client };
