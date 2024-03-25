import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DetailProductForm from "./DetailProductForm";
import { getData } from "../../Api/api";
import Product from "../ProductPage/Product";
import getFromStorage from "../../Service/getFromStorage";
import Button from "../../Components/ui/Button";

function DetailProduct() {
  const { productId, productName } = useParams();
  const [product, setProduct] = useState(null);
  const loggedUser = getFromStorage("username");
  const requestBody = { username: loggedUser };

  const addFavoriteClick = async (e) => {
    e.preventDefault();
    const favoriteProductId = e.target.getAttribute("id");
    try {
      const response = await putData(
        `/products/${favoriteProductId}`,
        requestBody,
        {
          Authorization: `${token}`,
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getData(`/products/${productId}/${productName}`);
        setProduct(response);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    product && (
      <>
        {
          <p>
            Anunciante: {product.owner === loggedUser ? "Yo" : product.owner}
          </p>
        }
        {loggedUser === product.owner ? (
          ""
        ) : product.favs.includes(loggedUser) ? (
          <p>FAVORITO</p>
        ) : (
          <Button id={product._id} onClick={addFavoriteClick}>
            Agregar Favorito
          </Button>
        )}
        <Product product={product} />
      </>
    )
  );
}

export default DetailProduct;
