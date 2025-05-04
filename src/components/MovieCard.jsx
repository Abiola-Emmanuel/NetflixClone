import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/moviecard.css';
import { BASE_URL, IMAGE_BASE_URL, API_KEY } from '../config';

function MovieCard({ movie, isLargeRow }) {
  const [trailerKey, setTrailerKey] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        let type = 'movie';
        if (movie.first_air_date) {
          type = 'tv';
        }
        const response = await axios.get(`${BASE_URL}/${type}/${movie.id}/videos?api_key=${API_KEY}`);
        const trailers = response.data.results.filter((video) => video.type === 'Trailer' && video.site === 'YouTube');
        if (trailers.length > 0) {
          setTrailerKey(trailers[0].key);
        }
      } catch (err) {
        console.error('Error fetching trailer: ', err);
      }
    };

    fetchTrailer();
  }, [movie.id]);

  const handleCardClick = () => {
    window.open(`https://www.themoviedb.org/movie/${movie.id}/watch?locale=US`, '_blank');
  };

  const handlePlayTrailer = (e) => {
    e.stopPropagation();
    if (trailerKey) {
      setOpen(true);
    } else {
      alert('No trailer available.');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      className={`movieCard ${isLargeRow && "movieCard--large"}`}
      onClick={handleCardClick}
    >
      <img
        className="movieCard__poster"
        src={`${IMAGE_BASE_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
        alt={movie.name || movie.title}
      />
      <div className="movieCard__info">
        <h3>{movie.title || movie.name}</h3>
        <p>★ {Math.round(movie.vote_average)} / 10</p>

        {/* Play Trailer Button */}
        <button onClick={handlePlayTrailer} className="playTrailerButton">
          ▶ Play Trailer
        </button>
      </div>

      {/* Trailer Modal */}
      {open && (
        <div className="modalOverlay" onClick={handleClose}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="YouTube Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button className="closeButton" onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieCard;
