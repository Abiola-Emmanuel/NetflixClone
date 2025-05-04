import React from "react";
import { IMAGE_BASE_URL } from "../config";

function SearchCard({ searchMovie }) {
  return (
    <div className='movieCard'>
      <img
        className="poster"
        src={`${IMAGE_BASE_URL}${searchMovie.backdrop_path}`}
        alt={searchMovie.name}
        onClick={() => window.open(`https://www.themoviedb.org/movie/${searchMovie.id}/watch?locale=US`, '_blank')}
      />
      <div className="info">
        <h3>{searchMovie.title || searchMovie.name}</h3>
        <p>★ {Math.round(searchMovie.vote_average)} / 10</p>
      </div>
    </div>
  )
}

export default SearchCard