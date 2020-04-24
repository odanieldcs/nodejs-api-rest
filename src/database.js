import mongoose from 'mongoose';

const uri = `mongodb://${process.env.DATABASE_USERNAME}1:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOSTNAME}/${process.env.DATABASE_DATABASE}`;

class Database {
  constructor() {
    this.init();
  }

  init() {
    mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.info('Database connection successfully');
      })
      .catch((err) => {
        console.error('Database connection fail');
        console.error(err);
      });
  }
}

export default new Database();
