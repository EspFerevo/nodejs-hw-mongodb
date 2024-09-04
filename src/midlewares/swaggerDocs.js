import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';
import { SWAGGER_PATH } from '../constants/index.js';

export const swaggerDocs = (req, res, next) => {
  try {
    const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
    swaggerUI.setup(swaggerDoc)(req, res, next);
  } catch (err) {
    console.log(err);
    next(createHttpError(500, "Can't load swagger docs"));
  }
};
