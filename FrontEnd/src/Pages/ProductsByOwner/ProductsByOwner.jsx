import React, { useState, useEffect } from "react";
import Product from "../ProductPage/Product";
import { useParams } from "react-router";
import { getData } from "../../Api/api";
import cardStyles from "../ProductsByOwner/products_by_owner.module.css";
const ProductsByOwner = () => {
  const [products, setProducts] = useState([]);
  const { owner } = useParams();
  console.log(owner);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getData(`/products/list/${owner}`);
        console.log(response);
        setProducts(response); // Assuming your response contains the product data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [owner]);

  return (
    <div className={cardStyles.grid}>
      {products.map((product) => (
        <Product styles={cardStyles} key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductsByOwner;
