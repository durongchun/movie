import { createContext, useContext, useEffect, useState } from "react";

const FavoriteContext = createContext();
export const useFavorite = () => useContext(FavoriteContext);

const API_BASE_URL = "http://localhost:3000"; // Update this if backend is deployed

export const FavoriteProvider = ({ children }) => {
  const [favoriteList, setFavoriteList] = useState([]);

  // Fetch favorite movies from backend when app loads
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/favorites`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setFavoriteList(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  // Add a movie to favorites
  const addToFavorite = async (movie) => {
    try {
      const response = await fetch(`${API_BASE_URL}/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movie),
      });

      if (response.ok) {
        setFavoriteList((prev) => {
          if (!prev.some((m) => m.id === movie.id)) {
            return [...prev, movie];
          }
          return prev;
        });
      } else {
        console.error("Failed to add movie to favorites");
      }
    } catch (error) {
      console.error("Error adding movie to favorites:", error);
    }
  };

  // Remove a movie from favorites
  const removeFromFavorite = async (movieId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/favorites/${movieId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFavoriteList((prev) => prev.filter((movie) => movie.id !== movieId));
      } else {
        console.error("Failed to remove movie from favorites");
      }
    } catch (error) {
      console.error("Error removing movie from favorites:", error);
    }
  };

  // Check if a movie is in favorites
  const isInFavorite = (movieId) => {
    return favoriteList.some((movie) => movie.id === movieId);
  };

  return (
    <FavoriteContext.Provider
      value={{ favoriteList, addToFavorite, removeFromFavorite, isInFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
