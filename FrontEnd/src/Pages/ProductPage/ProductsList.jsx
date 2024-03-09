import React from 'react'
import { Link } from 'react-router-dom';


function Product({ name }) {
    return (
      <div>
        <p>{name}</p>
      </div>
    );
  }

function ProductsList({products}) {
    const renderProduct = ({ id, ...product }) => (
        <li key={id}>
          <Link to={id}>
            <Product {...product} />
          </Link>
        </li>
      );
  
  return (
    <ul>{products.map(renderProduct)}</ul>
  )
}


export default ProductsList