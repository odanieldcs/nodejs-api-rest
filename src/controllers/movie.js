import Movie from '../models/movie';

class MovieController {
  async get(req, res) {
    try {
      const movies = await Movie.find({});
      res.send(movies);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async getById(req, res) {
    try {
      const {
        params: { id },
      } = req;

      const movie = await Movie.find({ _id: id });
      res.send(movie);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async create(req, res) {
    const movie = new Movie(req.body);
    try {
      await movie.save();
      res.status(201).send(movie);
    } catch (err) {
      res.status(422).send(err.message);
    }
  }

  async update(req, res) {
    try {
      await Movie.updateOne({ _id: req.params.id }, req.body);
      res.sendStatus(200);
    } catch (err) {
      res.status(422).send(err.message);
    }
  }

  async delete(req, res) {
    try {
      await Movie.deleteOne({ _id: req.params.id });
      res.sendStatus(204);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
}

export default new MovieController();
