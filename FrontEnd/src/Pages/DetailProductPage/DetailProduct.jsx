import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DetailProductForm from "./DetailProductForm";
import { getData } from "../../Api/api";
import Product from "../ProductPage/Product";
import getFromStorage from "../../Service/getFromStorage";
import Button from "../../Components/ui/Button";
import { useNavigate } from "react-router";
function DetailProduct() {
  const navigate = useNavigate();
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

  const goToEditProduct = () => {
    navigate(`/edit/${product._id}`);
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
      <div className="max-w-xl  mx-auto p-5">
        {/* Nombre del propietario del anuncio */}
        {
          <p>
            Anunciante:{" "}
            <Link to={`/products/list/${product.owner}`}>
              {product.owner === loggedUser ? "Yo" : product.owner}
            </Link>
          </p>
        }

        {/* Si aun no es favorito renderiza el boton, sino, el texto 'FAVORITO' */}
        {loggedUser === product.owner ? (
          ""
        ) : product.favs.includes(loggedUser) ? (
          <p>FAVORITO</p>
        ) : (
          <Button id={product._id} onClick={addFavoriteClick}>
            Agregar Favorito
          </Button>
        )}

        <section className="mt-4">
          <Product product={product} />
        </section>
      </div>
    )
  );
}

export default DetailProduct;
