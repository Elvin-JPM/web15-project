import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../Components/ui/Button'
import placeholder from './../../Assets/placeholder.png';

function Product({ _id, name, price, sale, photo }) {
	const navigate = useNavigate();
        const handleButton = (e)=>{ 
			e.preventDefault();
			navigate(`/products/${_id}/edit`);
        }

	return (
		<section className='px-4 py-8 mx-auto max-w-md font-sans antialiased'>
			<a href='#' className='group relative block overflow-hidden'>
				<img
					src={placeholder || photo}
					alt={name}
					className='h-64 w-full object-cover rounded-md transition duration-300 group-hover:scale-105 sm:h-72'
				/>

				<span className='absolute bottom-4 right-4 z-10 px-3 py-1.5 text-xs font-medium bg-primary text-white rounded-full'>
					{sale ? 'Sell' : 'Buy'}
				</span>

				<button className='absolute top-4 end-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75 group-hover:scale-105'>
					<span className='sr-only'>Wishlist</span>
				</button>
			</a>

			<div className='relative border border-gray-100 bg-white p-6 rounded-md'>
				<h3 className='mt-4 text-lg font-medium text-gray-900'>{price}€</h3>
				<p className='mt-1.5 text-sm text-gray-700'>{name}</p>
				<Button onClick={handleButton}>
                  Editar producto
                </Button>
			</div>
			
		</section>
	);
}

function ProductsList({ products }) {
  const renderProduct = ({ _id, ...product }) => (
    <li key={_id}>
      <Link to={`/products/${_id}`}>
        <Product _id={_id} {...product} />
      </Link>
    </li>
  );

  return <ul>{products.map(renderProduct)}</ul>;
}

export default ProductsList;
