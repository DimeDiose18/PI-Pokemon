import styles from "./Log.module.css";
import Login from "./Login";
import Logout from "./Logout";

const Log = () => {
    return (
        <div className={styles.container}>
        <Login />
        <Logout />
        </div>
    )
};

export default Log;