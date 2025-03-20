import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from "../components/Search";
import PageHome from "../pages/PageHome";
import PageAbout from "../pages/PageAbout";
import PageWatchLater from "../pages/PageWatchLater";
import MovieDetails from "../pages/MovieDetails";
import { WatchLaterProvider } from "../context/WatchLaterContext";
import { FavoriteProvider } from "../context/FavoriteContext";
import PageFavorites from "../pages/PageFavorites";

function AppRouter() {
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search on Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(e.target.value); // Update searchQuery state
    }
  };

  return (
    <BrowserRouter>
      <WatchLaterProvider>
        <FavoriteProvider>
          <div className="wrapper">
            <Header />
            <Search
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleKeyDown={handleKeyDown}
            />

          <Routes>
            <Route
              path="/"
              element={
                <PageHome
                  searchQuery={searchQuery}
                  handleKeyDown={handleKeyDown}
                />
              }
            />
            <Route path="/movie/:id" element={<MovieDetails searchQuery={searchQuery} />} />
            <Route path="/about" element={<PageAbout />} />
            <Route path="/watch-later" element={<PageWatchLater  searchQuery={searchQuery}/>} />
            <Route path="/favorites" element={<PageFavorites searchQuery={searchQuery} />} />

          </Routes>
          <Footer />
        </div>
      </WatchLaterProvider>
    </BrowserRouter>
  );
}

export default AppRouter;
