import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const categories = [
  { key: "popular", label: "Popular" },
  { key: "top_rated", label: "Top Rated" },
  { key: "now_playing", label: "Now Playing" },
  { key: "upcoming", label: "Upcoming" },
];

const PageHome = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const [releasedDate, setReleasedDate] = useState("2020");

  // Generate release years from 2000 to the current year
  const releaseYears = Array.from(
    { length: new Date().getFullYear() - 1999 },
    (_, i) => 2000 + i
  );

  useEffect(() => {
    fetchMovie(selectedCategory, releasedDate);
  }, [selectedCategory, releasedDate]);

  function fetchMovie(category, year) {
    let url = "";

    const sortByMap = {
      popular: "popularity.desc",
      top_rated: "vote_average.desc",
      now_playing: "popularity.desc",
      upcoming: "popularity.desc",
    };

    url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=${sortByMap[category]}&primary_release_year=${year}`;

    console.log("API URL:", url);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data:", data);
        setMovies(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError(`Failed to fetch movies: ${error.message}`);
        setLoading(false);
      });
  }

  function formatDate(dateString) {
    const date = new Date(dateString);

    // Extract month, day, and year
    const month = date.toLocaleString("default", { month: "short" }); // "Jul"
    const day = date.getDate(); // 10
    const year = date.getFullYear(); // 2020

    // Format as "Mar 15, 2025"
    return `${month} ${day}, ${year}`;
  }

  function ratingStar(voteAverage) {
    // Convert vote_average to a 5-star scale
    const ratingOutOf5 = voteAverage / 2;

    // Calculate the number of filled, half-filled, and empty stars
    const filledStars = Math.floor(ratingOutOf5);

    const hasHalfStar = ratingOutOf5 % 1 !== 0; // Check if there's a decimal part
    const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

    return (
      <div className="star-rating">
        {/* Display filled stars */}
        {Array.from({ length: filledStars }).map((_, index) => (
          <span key={`filled-${index}`} className="star filled">
            ⭐
          </span>
        ))}

        {/* Display half-filled star (if applicable) */}
        {hasHalfStar && (
          <span key="half" className="star half">
            ⭐
          </span>
        )}

        {/* Display empty stars */}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <span key={`empty-${index}`} className="star empty"></span>
        ))}

        {/* Display percentage */}
        <span className="percentage">{(voteAverage * 10).toFixed(1)}%</span>
      </div>
    );
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <div className="movieFilter">
        <div>
          <label htmlFor="showMe">Show me</label>
          <select
            name="showMe"
            id="showMe"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(({ key, label }) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="releaseYear">Movies released in</label>
          <select
            name="releaseYear"
            id="releaseYear"
            value={releasedDate}
            onChange={(e) => setReleasedDate(e.target.value)}
          >
            {releaseYears.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
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
              {/* Display the star rating */}
              {ratingStar(movie.vote_average)}
              <p>{formatDate(movie.release_date)}</p>
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
