/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
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

  describe('getById()', () => {
    it('should return a one movie', async () => {
      const fakeId = 'fake-id';
      const request = {
        params: {
          id: fakeId,
        },
      };
      const response = {
        send: sinon.spy(),
      };

      Movie.find = sinon.stub();
      Movie.find.withArgs({ _id: fakeId }).resolves(defaultMovie);

      const movieController = new MovieController(Movie);
      await movieController.getById(request, response);

      sinon.assert.calledWith(response.send, defaultMovie);
    });

    it('should return 400 when an error occurs', async () => {
      const fakeId = 'fake-id';
      const request = {
        params: {
          id: fakeId,
        },
      };
      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };

      response.status.withArgs(400).returns(response);

      Movie.find = sinon.stub();
      Movie.find.withArgs({ _id: fakeId }).rejects({ message: 'Error' });

      const movieController = new MovieController(Movie);

      await movieController.getById(request, response);

      sinon.assert.calledWith(response.send, 'Error');
    });
  });

  describe('create()', () => {
    it('should save a new movie successfully', async () => {
      const request = {
        body: defaultMovie[0],
        ...defaultMovie,
      };
      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };
      class fakeMovie {
        save() {}
      }
      response.status.withArgs(201).returns(response);
      sinon.stub(fakeMovie.prototype, 'save').withArgs().resolves();

      const movieController = new MovieController(fakeMovie);

      await movieController.create(request, response);

      sinon.assert.calledWith(response.send);
    });

    it('should return a 422 when an error occurs', async () => {
      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };

      class fakeMovie {
        save() {}
      }

      response.status.withArgs(422).returns(response);

      sinon
        .stub(fakeMovie.prototype, 'save')
        .withArgs()
        .rejects({ message: 'Error' });

      const movieController = new MovieController(fakeMovie);

      await movieController.create(defaultMovie, response);
      sinon.assert.calledWith(response.status, 422);
    });
  });

  describe('update()', () => {
    const fakeId = 'fake-id';
    const updatedMovie = {
      _id: fakeId,
      name: 'Updated movie',
      description: 'Updated description',
      year: 2020,
    };

    it('should respond with 200 when the movie has been updated', async () => {
      const request = {
        params: {
          id: fakeId,
        },
        body: updatedMovie,
      };
      const response = {
        sendStatus: sinon.spy(),
      };

      class fakeMovie {
        static updateOne() {}
      }

      const updateOneStub = sinon.stub(fakeMovie, 'updateOne');

      updateOneStub
        .withArgs({ _id: fakeId }, updatedMovie)
        .resolves(updatedMovie);

      const movieController = new MovieController(fakeMovie);

      await movieController.update(request, response);
      sinon.assert.calledWith(response.sendStatus, 200);
    });

    it('should return a 422 when an error occurs', async () => {
      const request = {
        params: {
          id: fakeId,
        },
        body: updatedMovie,
      };
      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };

      class fakeMovie {
        static updateOne() {}
      }

      const updateOneStub = sinon.stub(fakeMovie, 'updateOne');

      updateOneStub
        .withArgs({ _id: fakeId }, updatedMovie)
        .rejects({ message: 'Error' });

      response.status.withArgs(422).returns(response);

      const movieController = new MovieController(fakeMovie);

      await movieController.update(request, response);
      sinon.assert.calledWith(response.send, 'Error');
    });
  });

  describe('delete()', () => {
    it('should respond with 204 when the movie has been deleted', async () => {
      const fakeId = 'fake-id';
      const request = {
        params: {
          id: fakeId,
        },
      };
      const response = {
        sendStatus: sinon.spy(),
      };

      class fakeMovie {
        static deleteOne() {}
      }

      const deleteOneStub = sinon.stub(fakeMovie, 'deleteOne');

      deleteOneStub.withArgs({ _id: fakeId }).resolves();

      const movieController = new MovieController(fakeMovie);

      await movieController.delete(request, response);

      sinon.assert.calledWith(response.sendStatus, 204);
    });

    it('should return a 400 when an error occurs', async () => {
      const fakeId = 'fake-id';
      const request = {
        params: {
          id: fakeId,
        },
      };

      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };

      class fakeMovie {
        static deleteOne() {}
      }

      const deleteOneStub = sinon.stub(fakeMovie, 'deleteOne');

      deleteOneStub.withArgs({ _id: fakeId }).rejects({ message: 'Error' });
      response.status.withArgs(400).returns(response);

      const movieController = new MovieController(fakeMovie);

      await movieController.delete(request, response);
      sinon.assert.calledWith(response.send, 'Error');
    });
  });
});
