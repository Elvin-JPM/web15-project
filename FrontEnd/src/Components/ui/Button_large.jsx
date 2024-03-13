function Button_large(props) {
	return (
		<button
			className='bg-primary flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryDark transition-colors duration-300 hover:bg-primaryDark'
			{...props}
		>
			{props.children}
		</button>
	);
}

export default Button_large;
