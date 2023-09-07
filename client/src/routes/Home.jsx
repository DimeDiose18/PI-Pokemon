import { Link, Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer.jsx";
import Log from "../components/Login/Log.jsx";
import Nav from "../components/NavBar/Nav.jsx";
import styles from "../components/Home/Home.module.css";
import SideBarLeft from "../components/Home/SideBarLeft.jsx";

const Home = () => {
  return (
    <div className={styles.mainContainer}>
      <Log />
      <Nav />
      <div className={styles.viewContainer}>
        <div className={styles.sideBarLeft}>
          <SideBarLeft />
        </div>
        <div className={styles.sideBarRight}>
          <Link to={"/home"}>
            <button>X</button>
          </Link>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
