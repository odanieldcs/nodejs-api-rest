import express from 'express';
import MovieController from '../controllers/movie';
import Movie from '../models/movie';

const router = express.Router();
const movieController = new MovieController(Movie);

router.get('/', (req, res) => movieController.get(req, res));
router.get('/:id', (req, res) => movieController.getById(req, res));
router.post('/', (req, res) => movieController.create(req, res));
router.put('/:id', (req, res) => movieController.update(req, res));
router.delete('/:id', (req, res) => movieController.delete(req, res));

export default router;
