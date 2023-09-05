import styles from "./Loader.module.css";

const Loader = () => {
    return (
        <div className={styles.backgroundContainer}>
            <div className={styles.containerMain}>
                <div className={styles.loader}/>
            </div>
        </div>
    )
};

export default Loader;
