import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer.jsx";
import Log from "../components/Login/Log.jsx";
import Nav from "../components/NavBar/Nav.jsx";
import styles from "../components/Home/Home.module.css";
import SideBarLeft from "../components/Home/SideBarLeft.jsx";
import imageLoading from "../assets/images/Poké_Ball_icon.svg.png";
import { useState } from "react";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState();
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className={styles.mainContainer}>
      <Log />
      <Nav setSearchTerm={setSearchTerm} />
      <div className={styles.viewContainer}>
        <div className={styles.sideBarLeft}>
          <SideBarLeft searchTerm={searchTerm} />
        </div>
        <div className={styles.sideBarRight}>
          {path === "/home" && (
            <div className={styles.containerLoading}>
              <img
                className={styles.imageLoading}
                src={imageLoading}
                alt="loading..."
              />
            </div>
          )}
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
