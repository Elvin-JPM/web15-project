import React, { useState, useEffect } from "react";
import Product from "../ProductPage/Product";
import { useParams } from "react-router";
import { getData } from "../../Api/api";
import storage from "../../Api/storage";

const MyProducts = () => {
  const [products, setProducts] = useState([]);

  const localStorageUsername = storage.get("username");
  const sessionUsername = sessionStorage.getItem("username");
  const username = localStorageUsername || sessionUsername;
  console.log(username);
  useEffect(() => {
    if (username) {
      const fetchProducts = async () => {
        try {
          const response = await getData(`/products/list/${username}`);
          console.log(response);
          setProducts(response);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      fetchProducts();
    }
  }, []);

  return (
    <div>
      {products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
};

export default MyProducts;
