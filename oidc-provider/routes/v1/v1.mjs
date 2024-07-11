import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { PingRouter } from './ping/ping.controller.mjs';
import { OIDCRouter } from './oidc/oidc.controller.mjs';

const swaggerJsdocOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'u360 OIDC provider',
      version: '0.0.0',
      description: 'This is a REST API application made with Express.',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://github.com/nhannguyendevjs/u360-services/blob/master/LICENSE',
      },
      contact: {
        name: 'Nhan Nguyen',
        url: 'https://github.com/nhannguyendevjs',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/v1/ping/*.controller.mjs'],
};

const router = express.Router();

router
  .use('/ping', PingRouter)
  .use('/oidc', OIDCRouter)
  .use('/api-docs', swaggerUi.serve)
  .get('/api-docs', swaggerUi.setup(swaggerJsdoc(swaggerJsdocOptions)));

export { router as V1Router };
