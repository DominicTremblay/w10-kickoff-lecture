import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getMovies = async () => {
    try {
      const result = await axios({
        url: '/api/movies',
        method: 'GET',
      });

      setLoading(false);
      setMovies(result.data.movies);

      console.log(result.data);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);


  const movieList = movies.map((movie) => (
    <li key={movie.id}>
      Title: {movie.title} Release Date: {movie.release_date} Runtime(mins):{' '}
      {movie.runtime_mins}
    </li>
  ));

  return (
    <div className="App">
      <h1>Movies</h1>

      {loading && <h3>Loading movies...</h3>}

      {error && <h3>{error}</h3>}

      {!loading && !error && <ul>{movieList}</ul>}
    </div>
  );
}

export default App;
