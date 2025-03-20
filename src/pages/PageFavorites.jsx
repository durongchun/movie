import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useFavorite } from "../context/FavoriteContext";
import useFilteredMovies from "../hook/useFilteredMovies";

function PageFavorites({searchQuery}) {
  const { favoriteList, removeFromFavorite } = useFavorite();
  const filteredMovies = useFilteredMovies(favoriteList, searchQuery);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  function ratingStar(voteAverage) {
    const ratingOutOf5 = voteAverage / 2;
    const filledStars = Math.floor(ratingOutOf5);
    const hasHalfStar = ratingOutOf5 % 1 !== 0;
    const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="star-rating">
        {Array.from({ length: filledStars }).map((_, index) => (
          <span key={`filled-${index}`} className="star filled">
            ⭐
          </span>
        ))}
        {hasHalfStar && (
          <span key="half" className="star half">
            ⭐
          </span>
        )}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <span key={`empty-${index}`} className="star empty"></span>
        ))}
        <span className="percentage">{Math.round(voteAverage * 10)}%</span>
      </div>
    );
  }
  return (
    <main className="favorite-page">
      {favoriteList.length === 0 ? (
        <p>No favorite movie yet.</p>
      ) : (
        <ul>
          {filteredMovies.map((movie) => (
            <li
              key={movie.id}
              className={`movie-item ${
                movie.vote_average / 2 === 5 ? "fiveStar" : ""
              }`}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="details">
                <div className="title-favW">
                  <h4>{movie.title}</h4>
                  <div
                    className="favorite-icon"
                    onClick={() => {
                      console.log("Removing movie with ID:", movie.id);
                      removeFromFavorite(movie.id);
                    }}
                  >
                    <FaHeart />
                  </div>
                </div>

                {ratingStar(movie.vote_average)}
                <p>{formatDate(movie.release_date)}</p>
                <p className="overview">{movie.overview}</p>
                <button>
                  <Link to={`/movie/${movie.id}`}>More info</Link>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default PageFavorites;
