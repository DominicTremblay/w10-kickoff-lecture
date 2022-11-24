import db from '../connection.js';

export const getMovies = async () => {
  const data = await db.query('SELECT * FROM movies;');
  return data.rows;
};

export const getMovieById = async (id) => {
  const queryDef = {
    text: 'SELECT * FROM movies WHERE id=$1',
    values: [id],
  };
  const data = await db.query(queryDef);
  return data.rows[0];
};

export const createMovie = async ({ title, release_date, runtime_mins }) => {
  const queryDef = {
    text: 'INSERT INTO movies (title, release_date, runtime_mins) VALUES ($1, $2, $3) RETURNING *',
    values: [title, release_date, Number(runtime_mins)],
  };

  const data = await db.query(queryDef);
  return data.rows[0];
};

export const updateMovie = async (id, movieInfo) => {
  const setColumns = Object.keys(movieInfo).map((property,index) => `${property}=$${index + 2}`).join(', ')

  const queryDef = {
    text: `
      UPDATE movies
      SET ${setColumns}
      WHERE id = $1 RETURNING *`,
    values: [id, ...Object.values(movieInfo)],
  };

  console.log(queryDef);

  const data = await db.query(queryDef);
  return data.rows[0];
};

export const deleteMovie = async (id) => {
  const queryDef = {
    text: `DELETE FROM movies WHERE id=$1 RETURNING *`,
    values: [id],
  };

  const data = await db.query(queryDef);
  return data.rows[0];
};

export const getMovieGenres = async (id) => {
  const queryDef = {
    text: `
    SELECT movies.id as movie_id, title, release_date, runtime_mins, genres.id as genre_id, genre
    FROM movies
    INNER JOIN movie_genres
    ON movies.id = movie_genres.movie_id
    INNER JOIN genres
    ON movie_genres.genre_id = genres.id
    WHERE movies.id = $1
    `,
    values: [id],
  };

  const data = await db.query(queryDef);
  return data.rows;
};
