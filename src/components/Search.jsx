import { useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import PropTypes from "prop-types";

const Search = ({ searchQuery, setSearchQuery, handleKeyDown }) => {
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const location = useLocation(); // Get current route

  return (
    <div className="search-container">
      {/* Show Search only on home page|location.pathname === "/watch-later" */}
      {location.pathname === "/" && (
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search a movie by title"
            value={searchQuery}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      )}
    </div>
  );
};

Search.propTypes = {
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func,
};

export default Search;
