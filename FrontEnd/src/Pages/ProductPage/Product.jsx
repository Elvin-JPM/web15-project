import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../Components/ui/Button";
import placeholder from "./../../Assets/placeholder.png";

function Product({ product }) {
  console.log("at product component:", product);
  const navigate = useNavigate();
  const params = useParams;
  const handleButton = (e) => {
    e.preventDefault();
    navigate(`${product._id}/edit`);
  };

  return (
    <Link to={`/products/${product._id}/${product.name}`}>
      <div>
        <img
          src={product.photo}
          alt={product.name}
          className="h-64 w-full object-cover rounded-md transition duration-300 group-hover:scale-105 sm:h-72"
        />

        <span className="relative bottom-8 left-2 z-10 px-3 py-1.5 text-xs font-medium bg-primary text-white rounded-full">
          {product.sale ? "Sell" : "Buy"}
        </span>
      </div>
      <button className="absolute top-4 end-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75 group-hover:scale-105">
        <span className="sr-only">Wishlist</span>
      </button>

      <div className="relative border border-gray-100 bg-white p-6 rounded-md">
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          {product.price}€
        </h3>
        <p className="mt-1.5 text-sm text-gray-700">{product.name}</p>
        <p>{product.owner}</p>
        <Button onClick={handleButton}>Editar producto</Button>
      </div>
    </Link>
  );
}

export default Product;
