import { createContext, useContext, useState, useEffect } from 'react';

const WatchLaterContext = createContext();

export const useWatchLater = () => useContext(WatchLaterContext);

export const WatchLaterProvider = ({ children }) => {
  const [watchLaterList, setWatchLaterList] = useState(() => {
    const saved = localStorage.getItem('watchLaterList');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('watchLaterList', JSON.stringify(watchLaterList));
  }, [watchLaterList]);

  const addToWatchLater = (movie) => {
    setWatchLaterList(prev => {
      if (!prev.some(m => m.id === movie.id)) {
        return [...prev, movie];
      }
      return prev;
    });
  };

  const removeFromWatchLater = (movieId) => {
    setWatchLaterList(prev => prev.filter(movie => movie.id !== movieId));
  };

  const isInWatchLater = (movieId) => {
    return watchLaterList.some(movie => movie.id === movieId);
  };

  return (
    <WatchLaterContext.Provider value={{ 
      watchLaterList, 
      addToWatchLater, 
      removeFromWatchLater,
      isInWatchLater 
    }}>
      {children}
    </WatchLaterContext.Provider>
  );
};
