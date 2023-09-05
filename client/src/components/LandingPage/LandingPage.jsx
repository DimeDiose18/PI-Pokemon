import { Link } from "react-router-dom";
import styles from './LandingPage.module.css';
import Logo from '../../assets/images/gengardance.gif';
import arrow from '../../assets/images/flecha-correcta.png';

const LandingPage = () => {
  return (
    <div className={styles.main}>

    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={Logo} alt="gengarlogo" className={styles.logo}/>
    </div>
    <div className={styles.welcomeText}>
        <h1>Bienvenidos, ingresa por favor!</h1>
    </div>
      <Link to={"/home"}>
        <button className={styles.button}><img src={arrow} className={styles.arrow} alt="arrow"/></button>
      </Link>  
    </div>
    
    </div>
  );
};

export default LandingPage;
