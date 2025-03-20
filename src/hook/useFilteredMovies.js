import { useEffect, useState } from "react";

const useFilteredMovies = (movies, searchQuery) => {
  const [filteredMovies, setFilteredMovies] = useState(movies);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredMovies(movies);
    } else {
      setFilteredMovies(
        movies.filter((movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, movies]);

  return filteredMovies;
};

export default useFilteredMovies;
