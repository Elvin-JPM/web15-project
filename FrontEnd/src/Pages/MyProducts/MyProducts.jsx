import React, { useState, useEffect } from "react";
import Product from "../ProductPage/Product";
import { useNavigate, useParams } from "react-router";
import { getData } from "../../Api/api";
import storage from "../../Api/storage";
import Button from "../../Components/ui/Button";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const localStorageUsername = storage.get("username");
  const sessionUsername = sessionStorage.getItem("username");
  const username = localStorageUsername || sessionUsername;

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

  const goToEditProduct = (productId, productName) => {
    navigate(`/edit/${productId}/${productName}`);
  };

  return (
    <div>
      {products.map((product) => (
        <Product key={product._id} product={product}>
          <Button
            id={product._id}
            onClick={() => navigate(`/edit/${product._id}/${product.name}`)}
          >
            Editar producto
          </Button>
        </Product>
      ))}
    </div>
  );
};

export default MyProducts;
