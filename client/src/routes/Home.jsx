import { Link, Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer.jsx";
import Log from "../components/Login/Log.jsx";
import Nav from "../components/NavBar/Nav.jsx";
import styles from "../components/Home/Home.module.css";
import SideBarLeft from "../components/Home/SideBarLeft.jsx";
//import Loader from "../components/Home/Loader.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { getPokemons } from "../redux/reducers/pokemonReducer.js";

const Home = () => {
  const URL = "http://localhost:3001/pokemons";
  const dispatch = useDispatch();

  useEffect(()=> {
    axios.get(URL)
    .then((response) => {
      const data = response.data;
      //console.log(data);
      dispatch(getPokemons(data));
    })
    .catch((error)=> {
      console.error("Error al obtener los datos:", error)
    })
  }, [dispatch])

    return (
      <div className={styles.mainContainer}>
        <Log />
        <Nav />
        <div className={styles.viewContainer}>
          <div className={styles.sideBarLeft}>
            <SideBarLeft />
          </div>
          <div className={styles.sideBarRight}>
            <Link to={"/home/pokemons/:pokemonsid"}>
              <button>detail</button>
              <Outlet />
            </Link>
            <Link to={"/home"}>
              <button>X</button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  
};

export default Home;
