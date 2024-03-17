import React from "react";
import { Link } from "react-router-dom";

function Product({ name }) {
  return (
    <div>
      <p>{name}</p>
    </div>
  );
}

function ProductsList({ products }) {
  const renderProduct = ({ _id, ...product }) => (
    <li key={_id}>
      <Link to={`/products/${_id}`}>
        <Product {...product} />
      </Link>
    </li>
  );

  return <ul>{products.map(renderProduct)}</ul>;
}

export default ProductsList;
