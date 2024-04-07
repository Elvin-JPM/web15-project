function Footer(props) {
	return (
    <footer className="bg-gray-500 text-white py-4 z-40 text-center fixed bottom-0 w-full"
    {...props}
    >
      {props.children}
    </footer>
	);
}

export default Footer;