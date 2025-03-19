
import { FaSearch } from "react-icons/fa";
<<<<<<< Updated upstream

const SearchComponent = () => (
  <div className="search-container">
    <FaSearch className="search-icon" />
  </div>
);

=======
import PropTypes from "prop-types";
const SearchComponent = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="search-container">
      {" "}
      <FaSearch className="search-icon" />{" "}
      <input
        type="text"
        placeholder="Search for a movie by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        
      />{" "}
    </div>
  );
};
SearchComponent.propTypes = {
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
};
>>>>>>> Stashed changes
export default SearchComponent;
