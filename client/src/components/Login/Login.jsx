import { Link } from "react-router-dom";
import styles from "./Log.module.css";

const Login = () => {
    return (
        <>
        <Link to={'/profile'}>
           <button className={styles.button}>Log In</button> 
        </Link>
            
        </>
    )
};

export default Login;