import React, { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const PageHome = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
    console.log("API URL:", url); // Debugging: Log the API URL

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data:", data); // Debugging: Log the API response
        setMovies(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error); // Debugging: Log the error
        setError(`Failed to fetch movies: ${error.message}`);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <div className="movieFilter">
        <div>
          <label htmlFor="showMe">Show me</label>
          <select name="showMe" id="showMe">
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
          </select>
        </div>
        <div>
          <label htmlFor="releaseYear">Movies released in</label>
          <select name="releaseYear" id="releaseYear">
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
          </select>
        </div>
      </div>

      <ul>
        {movies.map((movie) => (
          <li key={movie.id} className="movie-item">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="details">
              <h4>{movie.title}</h4>
              <p>{movie.vote_average}</p>
              <p>{movie.release_date}</p>
              <p>{movie.title}</p>
              <p className="overview">{movie.overview}</p>
              <button>More info</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default PageHome;
