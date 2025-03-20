import React from "react";

function PageAbout() {
  return (
    <main className="about-page">
      <h2>WELCOME CINESTREAM</h2>
      <div className="about-content">
        <div>
          <p>
            Welcome to our premier movie discovery platform! We are passionate
            about bringing the magic of cinema right to your fingertips. Our
            website offers a comprehensive collection of movies from various
            genres, eras, and cultures, making it easier than ever to explore
            and discover your next favorite film.
          </p>
          <p>
            With our intuitive search feature, you can quickly find movies by
            title, genre, or cast members. Want to save movies for later? Our
            "Watch Later" feature allows you to create your personal watchlist,
            ensuring you never miss out on films you're interested in.
          </p>
        </div>
        <div>
          <p>
            We pride ourselves on providing detailed information about each
            movie, including ratings, reviews, cast details, and plot summaries.
            Whether you're a casual viewer or a dedicated cinephile, our
            platform is designed to enhance your movie-watching experience.
          </p>
          <div className="movielogo">
            <img src="../../public/video-camera.png" alt="logo" />
            <img src="../../public/clapperboard.png" alt="logo" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default PageAbout;
