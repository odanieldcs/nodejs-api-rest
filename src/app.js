import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import routes from './routes';

const prepare = async () => {
  await dotenv.config();

  const app = express();

  app.use(bodyParser.json());
  app.use(helmet());

  app.use('/', routes);

  return app;
};

export default async () => {
  const app = await prepare();

  return app;
};
