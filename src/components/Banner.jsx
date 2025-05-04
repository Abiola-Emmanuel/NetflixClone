import React from "react";
import '../styles/banner.css'
import { API_KEY, IMAGE_BASE_URL, BASE_URL } from "../config";

function Banner({ movie }) {

  return (

    <div
      className="banner"
      style={{
        backgroundImage: `url("${IMAGE_BASE_URL}${movie.backdrop_path}")`,
        loading: "lazy",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie.title || movie.name || movie.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button1">Play</button>
          <button className="banner_button2">My List</button>
        </div>
        <p className="banner_description">
          {movie.overview}
        </p>
      </div>
      <div className="banner--fadeBottom"></div>
    </div>
  )
}

export default Banner;