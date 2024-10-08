import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { env } from './utils/env.js';
import router from './routers/index.js';
import { errorHandler } from './midlewares/errorHandler.js';
import { notFoundHandler } from './midlewares/notFoundHandler.js';
import swaggerUI from 'swagger-ui-express';
import { swaggerDocs } from './midlewares/swaggerDocs.js';
import { UPLOAD_DIR } from './constants/index.js';

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Your server is successfully responding to the request.',
    });
  });

  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use(router);

  app.use('/api-docs', swaggerUI.serve, swaggerDocs);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
