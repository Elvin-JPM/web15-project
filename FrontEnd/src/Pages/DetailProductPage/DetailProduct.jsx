import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DetailProductForm from "./DetailProductForm";
import { deleteData, getData, putData } from "../../Api/api";
import Product from "../ProductPage/Product";
import getFromStorage from "../../Service/getFromStorage";
import Button from "../../Components/ui/Button";
<<<<<<< HEAD
import { useNavigate } from "react-router";
=======
import { useNavigate } from "react-router-dom";
>>>>>>> 5d1f2bc9574fb5efac5b8918a417fbfbe4d99d08
import FacebookShareButton from "../../Components/FacebookShare";
import TwitterShareButton from "../../Components/TwitterShare";
import Chat from "../Chat/Chat";
import SweetAlert from "../../Components/ui/SweetAlert";
<<<<<<< HEAD
//import Chat from "../../Components/chat";
=======
import Header from "../../Components/ui/Header";

>>>>>>> 5d1f2bc9574fb5efac5b8918a417fbfbe4d99d08
function DetailProduct() {
  const navigate = useNavigate();
  const [showSweetAlertProductAdded, setShowSweetAlertProductAdded] =
    useState(false);
  const { productId, productName } = useParams();
  const [product, setProduct] = useState(null);
<<<<<<< HEAD
  const [favoriteStatus, setFavoriteStatus] = useState(null);
=======
  const [favoriteStatus, setFavoriteStatus] = useState(false);
>>>>>>> 5d1f2bc9574fb5efac5b8918a417fbfbe4d99d08

  useEffect(() => {
    if (localStorage.getItem("mostrarSweetAlert") === "true") {
      setShowSweetAlertProductAdded(true);
      localStorage.removeItem("mostrarSweetAlert");
    }
  }, []);

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

<<<<<<< HEAD
=======
  const openChat = () => {
    if (product) {
      console.log("from openChat", product);
      navigate("/chat", { state: { productChat: product } });
    }
  };

>>>>>>> 5d1f2bc9574fb5efac5b8918a417fbfbe4d99d08
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

<<<<<<< HEAD
        {loggedUser === product.owner ? (
          ""
        ) : (
          <Button id={product._id} onClick={favoriteClick}>
            {favoriteStatus ? "Quitar Favorito" : "Agregar Favorito"}
          </Button>
        )}
=======
        {/* Boton de agreagar/quitar favorito */}
        {loggedUser === product.owner
          ? ""
          : loggedUser && (
              <Button onClick={favoriteClick}>
                {favoriteStatus ? "Quitar Favorito" : "Agregar Favorito"}
              </Button>
            )}

        {/* Boton para iniciar un chat con el propietario del producto */}
        {loggedUser === product.owner
          ? ""
          : loggedUser && <Button onClick={openChat}>Chat</Button>}
>>>>>>> 5d1f2bc9574fb5efac5b8918a417fbfbe4d99d08

        <section className="mt-4">
          <Product product={product} />
        </section>
        <div>
          <FacebookShareButton
            url={`http://localhost:5173/products/${productName}/${productId}`}
          />
          <TwitterShareButton
            url={`http://localhost:5173/products/${productName}/${productId}`}
            text="Check out this product!"
          />
        </div>
<<<<<<< HEAD
        <Chat />
=======
>>>>>>> 5d1f2bc9574fb5efac5b8918a417fbfbe4d99d08
        {showSweetAlertProductAdded && (
          <SweetAlert
            title="Producto Editado"
            text="Cambios guardados exitosamente."
            succeeded={true}
            onConfirm={() => setShowSweetAlertProductAdded(false)}
          />
        )}
<<<<<<< HEAD
        <Chat owner={product.owner} />
=======
        {/* <Chat owner={product.owner} /> */}
>>>>>>> 5d1f2bc9574fb5efac5b8918a417fbfbe4d99d08
      </div>
    )
  );
}

export default DetailProduct;
