import styles from "./SearchBar.module.css";
import search from "../../../assets/images/lupa-verde.png";

const SearchBar = ({setSearchTerm}) => {

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm)
  };
  return (
    <div className={styles.containerSearch}>
      <input
        type="text"
        placeholder="Catch a Pokemon!"
        className={styles.searchBox}
        onChange={handleSearchChange}
      />
      <button className={styles.searchImg}>
        <img src={search} alt="img search" />
      </button>
    </div>
  );
};

export default SearchBar;
