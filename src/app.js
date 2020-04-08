import './env';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import { loggerMiddleware } from './middlewares/logger';

const prepare = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(morgan('combined'));
  app.use(helmet());
  app.use(loggerMiddleware);

  app.use('/', routes);

  return app;
};

export default async () => {
  const app = prepare();

  return app;
};
