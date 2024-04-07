function Footer(props) {
	return (
    <footer className="bg-gray-500 text-white py-3 text-center w-full z-40"
    {...props}
    >
      {props.children}
    </footer>
	);
}

export default Footer;