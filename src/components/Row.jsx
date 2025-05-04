import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import '../styles/row.css';

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isLargeRow={isLargeRow}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;