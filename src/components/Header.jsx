import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div id="header-menu-logo">
        <img src="../../public/movielogo-removebg-preview.png" alt="MVDBlogo" />
        <div id="menu">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/favourites">Favourites</Link>
          <Link to="/watch-later">Watch Later</Link>
        </div>
      </div>
    </header>
  );
}
export default Header;
