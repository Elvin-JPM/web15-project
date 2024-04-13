function Label(props) {
	return (
		<label
			className='block text-sm font-medium leading-6 text-slate-500'
			{...props}
		>
			{props.children}
		</label>
	);
}

export default Label;
