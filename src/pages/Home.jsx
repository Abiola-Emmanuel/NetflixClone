import React from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner';
import Row from '../components/Row';
import { useState, useEffect } from 'react';
import { BASE_URL, API_KEY } from '../config';
import '../styles/home.css'
import SearchCard from '../components/SearchCard'


function Home() {
  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState([]);
  const [input, setInput] = useState('')

  const fetchMovie = async (url) => {
    const response = await axios.get(url);
    setMovies(response.data.results);
    setSearchMovie(response.data.results);
    console.log(response.data);
  }

  const fetchSearchMovie = async (url) => {
    const response = await axios.get(url);
    setSearchMovie(response.data.results);
    console.log(response.data);
  }

  useEffect(() => {
    fetchMovie(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
  }, []);

  const handleChange = (e) => {
    window.prevetDefault;
    const term = e.target.value;
    setInput(term);

    if (term.trim() === '') {
      setSearchMovie([]);
      return;
    } else {
      fetchSearchMovie(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${term}`);
    }
  };

  return (
    <>
      <Navbar />
      {movies.length > 0 && (
        <Banner movie={movies[Math.floor(Math.random() * movies.length)]} />
      )}
      <div className="next">
        <h1>See what's next</h1>
        <h3>WATCH ANYWHERE, CANCEL ANYTIME</h3>
      </div>

      <div className="mov">
        <Row
          title="NETFLIX ORIGINALS"
          fetchUrl={`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`}
          isLargeRow
        />
        <Row
          title="Trending Now"
          fetchUrl={`${BASE_URL}/trending/all/week?api_key=${API_KEY}`}
        />
        <Row
          title="Top Rated"
          fetchUrl={`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`}
        />
        <h1 style={{ textAlign: 'center', fontSize: '2rem', textDecoration: 'underline' }}>GENRES</h1>
        <Row
          title="Action Movies"
          fetchUrl={`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`}
        />
        <Row
          title="Comedy Movies"
          fetchUrl={`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`}
        />
        <Row
          title="Horror Movies"
          fetchUrl={`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`}
        />
        <Row
          title="Romance Movies"
          fetchUrl={`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`}
        />
        <Row
          title="Documentaries"
          fetchUrl={`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`}
        />
        <Row
          title="Sci-Fi Movies"
          fetchUrl={`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=878`}
        />
        <Row
          title="Animated Films"
          fetchUrl={`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16`}
          isLargeRow
        />
        <Row
          title="Thrillers"
          fetchUrl={`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=53`}
        />
        <Row
          title="Fantasy Movies"
          fetchUrl={`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=14`}
        />
        <Row
          title="Crime Dramas"
          fetchUrl={`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=80`}
        />
        <Row
          title="Family Favorites"
          fetchUrl={`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10751`}
          isLargeRow
        />
        <Row
          title="Anime Movies"
          fetchUrl={`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16&with_original_language=ja`}
        />
        <div className="movie-search-container">
          <div className="search-input-container">
            <input
              type="text"
              autoFocus
              value={input}
              onChange={handleChange}
              placeholder="Search movies..."
              className="movie-search-input"
            />
            <svg className="search-icon" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </div>
          <div className="movies-grid">
            {input.trim() !== '' && searchMovie.map((sm) => (
              <SearchCard
                key={sm.id}
                searchMovie={sm}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;