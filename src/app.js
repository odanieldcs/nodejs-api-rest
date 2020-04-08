import './env';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import routes from './routes';

const prepare = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(helmet());

  app.use('/', routes);

  return app;
};

export default async () => {
  const app = prepare();

  return app;
};
