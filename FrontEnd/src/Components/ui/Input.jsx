export function Input(props) {
	return (
		<>
			<input
				className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-4 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6 px-3'
				{...props}
			/>
		</>
	);
}

export default Input;
