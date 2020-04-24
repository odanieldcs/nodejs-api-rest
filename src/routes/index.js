import { Router } from 'express';
import movieRouter from './movie';

const router = new Router();

router.get('/healths', (req, res) => res.status(200).json({ status: 'UP' }));
router.use('/movies', movieRouter);

export default router;
