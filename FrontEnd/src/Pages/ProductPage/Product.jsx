import React from "react";
import {Card, CardTitle, CardContent} from "../../Components/ui/CardComponent";
import getFromStorage from "../../Service/getFromStorage";
import placeholder from "../../Assets/placeholder.png";


function Product({ product, children }) {
  const loggedUser = getFromStorage("username");
  const imageUrl = `http://127.0.0.1:3000/api/images/${product.photo}`
    ? `http://127.0.0.1:3000/api/images/${product.photo}`
    : placeholder;
  return (
    <div className="">
    <Card key='1'>
      <CardTitle>
        <img
      	src='https://images.unsplash.com/photo-1599481238640-4c1288750d7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80'
          alt={product.name}
          className="h-64 w-full object-cover rounded-md transition duration-300 group-hover:scale-105 sm:h-72"
        />
        <span className="relative bottom-8 left-2 z-10 px-3 py-1.5 text-xs font-medium bg-primary text-white rounded-full">
          {product.sale ? "Sell" : "Buy"}
        </span>
      </CardTitle>
      <CardContent>
      <div className="relative bg-white p-6 rounded-md">
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          {product.price}€
        </h3>
        <p className="mt-1.5 text-sm text-gray-700">{product.name}</p>
      </div>
      </CardContent>
      {children}
      </Card>
      </div>
  );
}

export default Product;
