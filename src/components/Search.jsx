import { FaSearch } from "react-icons/fa";
import PropTypes from "prop-types";

const Search = ({ searchQuery, setSearchQuery, handleKeyDown }) => {
  // Handle input change
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="search-container">
      <FaSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search for a movie by title..."
        value={searchQuery} // Controlled component
        onChange={handleChange} // Update search query on change
        onKeyDown={handleKeyDown} // Handle Enter key
      />
    </div>
  );
};

Search.propTypes = {
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired
};

export default Search;
