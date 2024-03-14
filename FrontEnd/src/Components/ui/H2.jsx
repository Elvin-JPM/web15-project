function H2(props) {
	return (
		<h2 className='mt-10 text-center text-2xl font-light leading-9 tracking-tight text-gray-500'
			{...props}
		>
			{props.children}
		</h2>
	);
}

export default H2;