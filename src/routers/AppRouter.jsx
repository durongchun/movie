// App Router

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from "../components/Search";
import PageHome from "../pages/PageHome";
// import PageAbout from "../pages/PageAbout";
// import PageContact from "../pages/PageContact";
// import PageNotFound from "../pages/PageNotFound";

function AppRouter() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <Search />

        <Routes>
          <Route path="/" exact element={<PageHome />} />
          {/* <Route path="/about" element={<PageAbout />} /> */}
          {/* <Route path="/contact" element={<PageContact />} /> */}
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
