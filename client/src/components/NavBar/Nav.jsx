import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import logoPokemon from "../../assets/images/LogoGrande.png";
import SearchBar from "./SearchBar/SearchBar";

const Nav = ({setSearchTerm}) => {
    return (
        <nav className={styles.navBar}>
        <div className={styles.logoContainer}>
            <img src={logoPokemon} alt="Logo Pokemon" className={styles.logo}/>
        </div>
        <div>
            <SearchBar setSearchTerm={setSearchTerm}/>
        </div>
            <ul>
                <li>
                    <Link to={'/home'}> Home </Link>
                </li>
                <li>
                    <Link to={'/profile'}> Profile </Link>
                </li>
                <li>
                    <Link to={'/createPokemon'}> Create Pokemon </Link>
                </li>
            </ul>
        </nav>
    )
};

export default Nav;