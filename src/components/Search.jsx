import { FaSearch } from "react-icons/fa";

const SearchComponent = () => (
  <div className="search-container">
    <FaSearch className="search-icon" />
    <input type="text" placeholder="Search for a movie by title..." />
  </div>
);

export default SearchComponent;
