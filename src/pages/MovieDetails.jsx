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

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
      );
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setMovie(data);
      setLoading(false);
    } catch (err) {
      setError(`Failed to fetch movie details: ${err.message}`);
      setLoading(false);
    }
  };

  const handleFavoriteClick = async () => {
    if (isInFavorite(movie.id)) {
      await removeFromFavorite(movie.id);
    } else {
      const movieData = {
        id: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        overview: movie.overview,
      };
      await addToFavorite(movieData);
    }
  };

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
            <button className="favorite-icon" onClick={handleFavoriteClick}>
              <div>{isInFavorite(movie.id) ? <FaHeart /> : <FaRegHeart />}</div>
              {isInFavorite(movie.id)
                ? "Remove from Favorites"
                : "Favorite this Movie"}
            </button>
            <button
              className="favorite-icon"
              onClick={() => {
                isInWatchLater(movie.id)
                  ? removeFromWatchLater(movie.id)
                  : addToWatchLater(movie);
              }}
            >
              <div className="watch-later-icon">
                {isInWatchLater(movie.id) ? <FaBookmark /> : <FaRegBookmark />}
              </div>
              {isInWatchLater(movie.id)
                ? "Remove from Watch Later"
                : "Add to Watch Later"}
            </button>
          </div>
        </div>

        <p>
          <strong>Release Date:</strong>
          <br /> {movie.release_date}
        </p>
        <p>
          <strong>Rating:</strong>
          <br /> {Math.round(movie.vote_average * 10)}%
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
