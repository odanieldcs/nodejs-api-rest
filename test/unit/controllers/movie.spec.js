import sinon from 'sinon';
import MovieController from '../../../src/controllers/movie';
import Movie from '../../../src/models/movie';

describe('Controller: Movie', () => {
  const defaultMovie = {
    __v: 0,
    _id: '5e90f0600bf2272ecf8e82d2',
    name: 'Star Wars A New Hope',
    description: 'Loren ipsun dolor',
    year: 1977,
  };

  const defaultRequest = {
    params: {},
  };

  describe('get()', () => {
    it('should return a list of movies', async () => {
      const response = {
        send: sinon.spy(),
      };

      Movie.find = sinon.stub();
      Movie.find.withArgs({}).resolves(defaultMovie);

      const movieController = new MovieController(Movie);

      await movieController.get(defaultRequest, response);

      sinon.assert.calledWith(response.send, defaultMovie);
    });

    it('should return 400 when an error occurs', async () => {
      const request = {};
      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };

      response.status.withArgs(400).returns(response);

      Movie.find = sinon.stub();
      Movie.find.withArgs({}).rejects({ message: 'Error' });

      const movieController = new MovieController(Movie);

      await movieController.get(request, response);

      sinon.assert.calledWith(response.send, 'Error');
    });
  });
});
