import styles from "./Footer.module.css";
import Whatsapp from "./Enlaces/Whatsapp";
import LinkedIn from "./Enlaces/LinkedIn";
import Instagram from "./Enlaces/Instagram";
import Google from "./Enlaces/Google";
import GitHub from "./Enlaces/GitHub";

const Footer = () => {
    return (
        <div className={styles.containerMain}>
            <div className={styles.socialNet}>
            <a href="https://wa.me/+573237128202" target="_blank">
              <Whatsapp />  
            </a>
            <a href="https://www.linkedin.com/in/dioselyn-lemus-66a0321aa/" target="_blank">
              <LinkedIn />  
            </a>
            <a href="https://www.instagram.com/dimediose/" target="_blank">
               <Instagram /> 
            </a>
            <a href="mailto:dimediose09@gmail.com" target="_blank">
               <Google /> 
            </a>
            <a href="https://github.com/DimeDiose18" target="_blank">
              <GitHub />  
            </a>
                
            </div>
        </div>
    )
};


export default Footer;