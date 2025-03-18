import { createContext, useContext, useEffect, useState } from "react";

const FavoriteContext =  createContext();

export const useFavorite = () => useContext(FavoriteContext);

export const FavoriteProvider = ({children}) => {
    const [favoriteList, setFavoriteList] = useState(() => {
        const saved = localStorage.getItem('favoriteList');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('favoriteList',JSON.stringify(favoriteList));
    }, [favoriteList]);

    const addToFavorite = (movie) => {
        setFavoriteList(prev => {
            if (!prev.some(m => m.id === movie.id)) {
                return [...prev, movie];
            }
            return prev;
        });
    };

    const removeFromFavorite = (movieId) => {
        setFavoriteList(prev => prev.filter(movie => movie.id !== movieId));
    };
    const isInFavorite = (movieId) => {
        return favoriteList.some(movie => movie.id === movieId);
    };

    return(
        <FavoriteContext.Provider value={{
            favoriteList,
            addToFavorite,
            removeFromFavorite,
            isInFavorite
        }}>
            {children}
        </FavoriteContext.Provider>
    );
};