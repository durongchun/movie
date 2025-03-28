import { useState } from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      {/* Desktop Header */}
      <div id="header-menu-logo">
        <img src="../../public/movielogo-removebg-preview.png" alt="MVDBlogo" />
        <div id="menu">
          <NavLink exact to="/" activeClassName="active" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/about" activeClassName="active" className="nav-link">
            About
          </NavLink>
          <NavLink
            to="/favourites"
            activeClassName="active"
            className="nav-link"
          >
            Favourites
          </NavLink>
          <NavLink
            to="/watch-later"
            activeClassName="active"
            className="nav-link"
          >
            Watch Later
          </NavLink>
        </div>
      </div>

      <div id="mobile-header-menu">
        <div id="hamburger-img">
          {/* Hamburger Button */}
          <button className="btn-menu" onClick={() => setMenuOpen(!menuOpen)}>
            <div id="nav-hm" className={menuOpen ? "open" : ""}>
              <div className="hm-menu"></div>
              <div className="hm-menu"></div>
              <div className="hm-menu"></div>
            </div>
          </button>
          <img
            src="../../public/movielogo-removebg-preview.png"
            alt="MVDBlogo"
          />
        </div>

        {/* Mobile Menu */}
        <nav className={`mobile-header ${menuOpen ? "open" : ""}`}>
          <NavLink
            to="/"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/favourites"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Favourites
          </NavLink>
          <NavLink
            to="/watch-later"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Watch Later
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
