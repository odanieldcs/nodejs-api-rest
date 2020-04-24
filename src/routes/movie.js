import { Router } from 'express';
import movieController from '../controllers/movie';

const router = new Router();

router.get('/', (req, res) => movieController.get(req, res));
router.get('/:id', (req, res) => movieController.getById(req, res));
router.post('/', (req, res) => movieController.create(req, res));
router.put('/:id', (req, res) => movieController.update(req, res));
router.delete('/:id', (req, res) => movieController.delete(req, res));

export default router;
