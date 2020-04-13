/* eslint-disable no-return-await */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import supertest from 'supertest';
import chai from 'chai';
import setupApp from '../../../src/app';
import Movie from '../../../src/models/movie';

describe('Routes: Movies', () => {
  before(async () => {
    const app = await setupApp();
    global.app = app;
    global.request = supertest(app);
    global.expect = chai.expect;
  });

  after(async () => await app.database.connection.close());

  const defaultId = '5e90f0600bf2272ecf8e82d2';
  const defaultMovie = {
    title: 'Star Wars A New Hope',
    description: 'Loren ipsun dolor',
    year: '1977',
    director: 'George Lucas',
  };
  const expectedMovie = {
    __v: 0,
    _id: '5e90f0600bf2272ecf8e82d2',
    title: 'Star Wars A New Hope',
    description: 'Loren ipsun dolor',
    year: '1977',
    director: 'George Lucas',
  };

  beforeEach(async () => {
    await Movie.deleteMany();

    const movie = new Movie(defaultMovie);
    movie._id = defaultId;
    return movie.save();
  });

  describe('GET /', () => {
    it('should return a list of movies', (done) => {
      request.get('/movies').end((err, res) => {
        expect(res.statusCode).to.eql(200);
        expect(res.body).to.eql([expectedMovie]);
        done(err);
      });
    });
  });

  describe('GET /', () => {
    it('should return 200 with one movie', (done) => {
      request.get(`/movies/${defaultId}`).end((err, res) => {
        expect(res.statusCode).to.eql(200);
        expect(res.body).to.eql([expectedMovie]);
        done(err);
      });
    });
  });

  describe('GET /', () => {
    it('should return a hello world', (done) => {
      request.get('/').end((err, res) => {
        expect(res.statusCode).to.eql(200);
        expect(res.body).to.eql({});
        expect(res.text).to.eql('Hello World!');
        done(err);
      });
    });
  });
});
