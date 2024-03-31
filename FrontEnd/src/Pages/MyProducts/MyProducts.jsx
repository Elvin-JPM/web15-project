import React, { useState, useEffect } from "react";
import Product from "../ProductPage/Product";
import { useNavigate, useParams } from "react-router";
import { deleteData, getData, putData } from "../../Api/api";
import Button from "../../Components/ui/Button";
import getFromStorage from "../../Service/getFromStorage";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [reservedStatus, setReservedStatus] = useState(false);
  const navigate = useNavigate();

  const username = getFromStorage("username");
  const token = getFromStorage("jwt");

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
  }, [reservedStatus]);

  const deleteProduct = async (productId) => {
    try {
      const response = await deleteData(`/products/${username}/${productId}`, {
        Authorization: `${token}`,
      });
      navigate(0);
    } catch (error) {
      console.log(error.message);
    }
  };

  const reserveProduct = async (productId, productReserved) => {
    const requestBody = {
      username,
      id: productId,
    };
    try {
      if (productReserved) {
        const response = await putData(
          `/products/uncheck-reserved/${productId}`,
          requestBody,
          {
            Authorization: `${token}`,
          }
        );
        console.log(response);
      } else {
        const response = await putData(
          `/products/check-reserved/${productId}`,
          requestBody,
          {
            Authorization: `${token}`,
          }
        );
        console.log(response);
      }
      setReservedStatus(!reservedStatus);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {products.map((product) => (
        <Product key={product._id} product={product}>
          <div>
            <Button
              id={product._id}
              onClick={() => navigate(`/edit/${product._id}/${product.name}`)}
            >
              Editar producto
            </Button>
            <Button id={product._id} onClick={() => deleteProduct(product._id)}>
              Borrar producto
            </Button>
            <Button
              id={product._id}
              onClick={() => reserveProduct(product._id, product.reserved)}
            >
              {product.reserved
                ? "Desmarcar como reservado"
                : "Marcar como reservado"}
            </Button>
          </div>
        </Product>
      ))}
    </div>
  );
};

export default MyProducts;
