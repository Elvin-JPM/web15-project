import styles from '../ui/footer.module.css'

function Footer(props)
{
	return (
    <footer className={styles.footer}
    {...props}
    >
      {props.children}
    </footer>
	);
}

export default Footer;