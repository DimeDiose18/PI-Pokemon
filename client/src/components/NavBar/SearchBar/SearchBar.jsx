import styles from "./SearchBar.module.css";
import search from "../../../assets/images/lupa-morada.png";

const SearchBar = () => {
    return (
        <div className={styles.containerSearch}>
        <input type="text" placeholder="Find a Pokemon"/>
            <button className={styles.searchImg}><img src={search} alt="img search"/></button>
        </div>
    )
}

export default SearchBar;