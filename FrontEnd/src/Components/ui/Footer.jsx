import { Link } from "react-router-dom";
import styles from "../ui/footer.module.css";
import Icon from "./Icon";
import Logo from "./Logo";
import facebook from "../../Assets/images/facebook.png";
import instagram from "../../Assets/images/instagram.png";
import twitter from "../../Assets/images/twitter.png";
import Input from "./Input";
import Button from "./Button";

function Footer(props) {
  return (
    <footer className={styles.footer}>
      <div>
        <div className={styles.logo}>
          <Logo />
        </div>

        <div className={styles.social}>
          <p>Follow us on social media:</p>
          <div className={styles.social_links}>
            <a href="http://www.facebook.com" target="_blank">
              <img src={facebook} className={styles.social_icon} />
            </a>
            <a href="http://www.instagram.com" target="_blank">
              <img src={instagram} className={styles.social_icon} />
            </a>
            <a href="http://www.twitter.com" target="_blank">
              <img src={twitter} className={styles.social_icon} />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.categories}>
        <h3 className={styles.categories_title}>Categories</h3>
        <p>Lifestyle</p>
        <p>Motor</p>
        <p>Electronics</p>
        <p>Work</p>
      </div>
    </footer>
  );
}

export default Footer;
