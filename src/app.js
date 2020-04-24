import './env';
import './database';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import { loggerMiddleware } from './middlewares/logger';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(bodyParser.json());
    this.server.use(morgan('combined'));
    this.server.use(helmet());
    this.server.use(loggerMiddleware);
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
