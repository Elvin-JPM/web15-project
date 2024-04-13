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
          <Icon />
          <Logo />
        </div>
        <div className={styles.social}>
          <Link>
            <img src={facebook} className={styles.social_icon} />
          </Link>
          <Link>
            <img src={instagram} className={styles.social_icon} />
          </Link>
          <Link>
            <img src={twitter} className={styles.social_icon} />
          </Link>
        </div>
      </div>

      <div>
        <h3 className={styles.categories_title}>Categories</h3>
        <div>Available categories</div>
      </div>

      <div className={styles.subscribe}>
        <h3 className={styles.subscribe_title}>Keep in touch</h3>
        <div className={styles.subscribe_form}>
          <Input />
          <Button>Subscribe</Button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
