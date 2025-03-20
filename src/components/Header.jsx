import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
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
    </header>
  );
}

export default Header;
