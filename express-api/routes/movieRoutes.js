import express from 'express';
import { getMovieById, getMovies, updateMovie } from '../db/queries/movies.js';

const router = express.Router();

// create the routes for movies
// /api/movies
router.get('/', async (req, res) => {
  try {
    const movies = await getMovies();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    const movie = await getMovieById(id);
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const movie = await updateMovie(id, req.body);
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

export default router;
