import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DetailProductForm from "./DetailProductForm";
import { deleteData, getData, putData } from "../../Api/api";
import Product from "../ProductPage/Product";
import getFromStorage from "../../Service/getFromStorage";
import Button from "../../Components/ui/Button";
import { useNavigate } from "react-router";

function DetailProduct() {
  const navigate = useNavigate();
  const { productId, productName } = useParams();
  const [product, setProduct] = useState(null);
  const [favoriteStatus, setFavoriteStatus] = useState(null);

  const loggedUser = getFromStorage("username");
  const token = getFromStorage("jwt");
  const requestBody = { username: loggedUser };

  const favoriteClick = async (e) => {
    e.preventDefault();
    const favoriteProductId = e.target.getAttribute("id");
    try {
      favoriteStatus
        ? await deleteData(`/products/${favoriteProductId}`, {
            Authorization: `${token}`,
          })
        : await putData(`/products/${favoriteProductId}`, requestBody, {
            Authorization: `${token}`,
          });
      setFavoriteStatus(!favoriteStatus);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getData(`/products/${productId}/${productName}`);
        setProduct(response);
        response.favs.includes(loggedUser)
          ? setFavoriteStatus(true)
          : setFavoriteStatus(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProduct();
  }, [productId]);

  console.log(product);
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

        {loggedUser === product.owner ? (
          ""
        ) : (
          <Button id={product._id} onClick={favoriteClick}>
            {favoriteStatus ? "Quitar Favorito" : "Agregar Favorito"}
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
