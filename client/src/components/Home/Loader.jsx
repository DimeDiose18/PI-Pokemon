import styles from "./Loader.module.css";
import loadingImg from "../../assets/images/mewdance.gif";

const Loader = () => {
  return (
    <div className={styles.backgroundContainer}>
        <img src={loadingImg} className={styles.loader} alt="meow-dance" />
    </div>
  );
};

export default Loader;
