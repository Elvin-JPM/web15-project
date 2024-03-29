import React from 'react';
import {
	Card,
	CardTitle,
	CardContent,
} from '../../Components/ui/CardComponent';
import getFromStorage from '../../Service/getFromStorage';
import placeholder from '../../Assets/placeholder.png';

function Product({ product, children }) {
	const loggedUser = getFromStorage('username');
	const imageUrl = product.photo
		? `http://127.0.0.1:3000/api/images/${product.photo}`
		: placeholder;

	const handleImageError = event => {
		event.target.src = placeholder; // Set placeholder if image fails to load
	};
	return (
		<div className=''>
			<Card key='1'>
				<CardTitle>
					<img
						src={imageUrl}
						alt={product.name}
						onError={handleImageError}
						className='h-64 w-full object-cover rounded-md transition duration-300 group-hover:scale-105 sm:h-72'
					/>
					<span className='relative bottom-8 left-2 z-10 px-3 py-1.5 text-xs font-medium bg-primary text-white rounded-full'>
						{product.sale ? 'Sell' : 'Buy'}
					</span>
				</CardTitle>
				<CardContent>
					<div className='relative bg-white p-6 rounded-md'>
						<h3 className='mt-4 text-lg font-medium text-gray-900'>
							{product.price}€
						</h3>
						<p className='mt-1.5 text-sm text-gray-700'>{product.name}</p>
					</div>
				</CardContent>
				{children}
			</Card>
		</div>
	);
}

export default Product;
