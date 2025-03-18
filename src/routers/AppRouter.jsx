// App Router

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from "../components/Search";
import PageHome from "../pages/PageHome";
import PageAbout from "../pages/PageAbout";
import PageWatchLater from "../pages/PageWatchLater";
import MovieDetails  from "../pages/MovieDetails";
import { WatchLaterProvider } from "../context/WatchLaterContext";
// import PageContact from "../pages/PageContact";
// import PageNotFound from "../pages/PageNotFound";

function AppRouter() {
  return (
    <BrowserRouter>
      <WatchLaterProvider>
        <div className="wrapper">
          <Header />
          <Search />

          <Routes>
            <Route path="/" exact element={<PageHome />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/about" element={<PageAbout />} />
            {/* <Route path="/contact" element={<PageContact />} /> */}
            {/* <Route path="*" element={<PageNotFound />} /> */}
            <Route path="/watch-later" element={<PageWatchLater />} />
          </Routes>
          <Footer />
        </div>
      </WatchLaterProvider>
    </BrowserRouter>
  );
}

export default AppRouter;
