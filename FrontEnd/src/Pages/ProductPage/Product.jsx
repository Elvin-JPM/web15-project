import React from "react";
import {
  Card,
  CardTitle,
  CardContent,
} from "../../Components/ui/CardComponent";
import getFromStorage from "../../Service/getFromStorage";
import placeholder from "../../Assets/placeholder.png";

const IMAGE_BASE_URL = import.meta.env.VITE_APP_IMAGES_URL;

function Product({ product, children }) {
  const loggedUser = getFromStorage("username");
  const imageUrl = product.photo
    ? `${IMAGE_BASE_URL}${product.photo}`
    : placeholder;

  const handleImageError = (event) => {
    event.target.src = placeholder; // Set placeholder if image fails to load
  };
  return (
    <div className="">
      <Card key="1">
        <CardTitle>
          <img
            src={imageUrl}
            alt={product.name}
            onError={handleImageError}
            className="h-64 w-full object-cover rounded-md transition duration-300 group-hover:scale-105 sm:h-72"
          />
          <span className="relative bottom-8 left-2 z-10 px-3 py-1.5 text-xs font-medium bg-primary text-white rounded-full">
            {product.sale ? "For Sale" : "Looking to buy"}
          </span>
        </CardTitle>
        <CardContent>
          <div className="relative bg-white p-6 rounded-md">
            <p>by: {product.owner}</p>
            <p>{product.description}</p>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              {product.price}€
            </h3>
            <p className="mt-1.5 text-sm text-gray-700">{product.name}</p>
            {children}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Product;
