import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: String,
  description: String,
  director: String,
  year: String,
});

const Movie = mongoose.model('Movie', schema);

export default Movie;
