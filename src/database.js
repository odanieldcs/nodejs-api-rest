import mongoose from 'mongoose';

const uri = `mongodb://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOSTNAME}/${process.env.DATABASE_DATABASE}`;

const connect = () =>
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

export default {
  connect,
  connection: mongoose.connection,
};
