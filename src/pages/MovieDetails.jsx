import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { useFavorite } from "../context/FavoriteContext";
import { useWatchLater } from "../context/WatchLaterContext";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToFavorite, removeFromFavorite, isInFavorite } = useFavorite();
  const { addToWatchLater, removeFromWatchLater, isInWatchLater } =
    useWatchLater();

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
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="rightside">
        <div className="movieTitle">
          <h2>{movie.title}</h2>
          <div className="favWatch">
            <button
              className="favorite-icon"
              onClick={(e) => {
                e.preventDefault();
                isInFavorite(movie.id)
                  ? removeFromFavorite(movie.id)
                  : addToFavorite(movie);
              }}
            >
              <div>{isInFavorite(movie.id) ? <FaHeart /> : <FaRegHeart />}</div>
              Favorite this moive
            </button>
            <button
              className="favorite-icon"
              onClick={(e) => {
                e.preventDefault();
                isInWatchLater(movie.id)
                  ? removeFromWatchLater(movie.id)
                  : addToWatchLater(movie);
              }}
            >
              <div className="watch-later-icon">
                {isInWatchLater(movie.id) ? <FaBookmark /> : <FaRegBookmark />}
              </div>
              Add to Watch later
            </button>
          </div>
        </div>

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
