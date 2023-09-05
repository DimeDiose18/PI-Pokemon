import { Link } from "react-router-dom";
import styles from "./Log.module.css";

const Logout = () => {
    return (
        <>
        <Link to={'/'}>
           <button className={styles.button}>Log Out</button> 
        </Link>
            
        </>
    )
};

export default Logout;