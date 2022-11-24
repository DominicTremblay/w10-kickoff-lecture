import express from 'express';
import {
  createMovie,
  deleteMovie,
  getMovieById,
  getMovieGenres,
  getMovies,
  updateMovie,
} from '../db/queries/movies.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const movies = await getMovies();
    res.json({ movies });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const movie = await getMovieById(id);
    res.json({ movie });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const movie = await createMovie(req.body);
    res.json({ movie });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {

  const id = Number(req.params.id);

  try {
    const movie = await updateMovie(id, req.body);
    res.json({ movie });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    const movie = await deleteMovie(id);
    res.json({ movie });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id/genres', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const result = await getMovieGenres(id);
    const movieGenres = result.reduce(
      (result, next) => {
        result.genres.push({
          genre_id: next.genre_id,
          genre: next.genre,
        });
        delete next.genre;
        delete next.genre_id;
        return Object.assign(result, next);
      },
      { genres: [] }
    );
    res.json({ movieGenres });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
