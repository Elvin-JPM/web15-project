function Label(props) {
	return (
		<label
			className='block text-xs font-medium leading-6 text-gray-500'
			{...props}
		>
			{props.children}
		</label>
	);
}

export default Label;
