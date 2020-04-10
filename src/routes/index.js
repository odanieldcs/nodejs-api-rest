import express from 'express';
import movieRouter from './movie';

const router = express.Router();

router.use('/movies', movieRouter);

router.get('/', (req, res) => {
  res.send('Hello World!');
});

export default router;
