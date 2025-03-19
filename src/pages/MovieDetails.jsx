import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  function fetchMovieDetails() {
    const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error!  Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(`Failed to fetch movie details: ${error.message}`);
        setLoading(false);
      });
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>No movie found</p>;

  const backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;

  return (
    <main
      className="movie-details"
      style={{
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        padding: "20px",
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div>
        <h2>{movie.title}</h2>

        <p>
          <strong>Release Date:</strong>
          <br /> {movie.release_date}
        </p>
        <p>
          <strong>Rating:</strong>
          <br /> {movie.vote_average}
        </p>
        <p>
          <strong>Overview:</strong>
          <br /> {movie.overview}
        </p>
        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
    </main>
  );
};
export default MovieDetails;
