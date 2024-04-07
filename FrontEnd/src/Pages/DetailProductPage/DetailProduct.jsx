import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DetailProductForm from "./DetailProductForm";
import { deleteData, getData, putData } from "../../Api/api";
import Product from "../ProductPage/Product";
import getFromStorage from "../../Service/getFromStorage";
import Button from "../../Components/ui/Button";
import { useNavigate } from "react-router-dom";
import FacebookShareButton from "../../Components/FacebookShare";
import TwitterShareButton from "../../Components/TwitterShare";
import Chat from "../Chat/Chat";
import SweetAlert from "../../Components/ui/SweetAlert";
import Header from "../../Components/ui/Header";
import styles from "../DetailProductPage/product_chats.module.css";

function DetailProduct() {
  const navigate = useNavigate();
  const [showSweetAlertProductAdded, setShowSweetAlertProductAdded] =
    useState(false);
  const { productId, productName } = useParams();
  const [product, setProduct] = useState(null);
  const [favoriteStatus, setFavoriteStatus] = useState(false);
  const [productChats, setProductChats] = useState(null);

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

  useEffect(() => {
    if (product?.owner === loggedUser) {
      const fetchChatsForProduct = async () => {
        try {
          const response = await getData(
            `/get-chats/${product.owner}/${product._id}`,
            {
              headers: { Authorization: `${token}` },
            }
          );
          console.log("Chats:", response);
          response && setProductChats(response.chats);
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchChatsForProduct();
    }
  }, [loggedUser, product]);

  const openChat = (productId, owner, client, productName) => {
    if (product) {
      console.log("from openChat", product);
      navigate(`/chat/${owner}/${productName}/${productId}`, {
        state: { owner, client, productId },
      });
    }
  };

  return (
    product && (
      <div className={`${styles.product_detail_page} max-w-xl  mx-auto p-5`}>
        {/* Nombre del propietario del anuncio */}
        {
          <p>
            Anunciante:{" "}
            <Link to={`/products/list/${product.owner}`}>
              {product.owner === loggedUser ? "Yo" : product.owner}
            </Link>
          </p>
        }
        {/* Boton de agreagar/quitar favorito */}
        {loggedUser === product.owner
          ? ""
          : loggedUser && (
              <Button id={product._id} onClick={favoriteClick}>
                {favoriteStatus ? "Quitar Favorito" : "Agregar Favorito"}
              </Button>
            )}
        {/* Boton para iniciar un chat con el propietario del producto */}

        {loggedUser === product.owner ? (
          ""
        ) : (
          <Button
            onClick={() =>
              openChat(product._id, product.owner, loggedUser, product.name)
            }
          >
            Chat
          </Button>
        )}
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
        {showSweetAlertProductAdded && (
          <SweetAlert
            title="Producto Editado"
            text="Cambios guardados exitosamente."
            succeeded={true}
            onConfirm={() => setShowSweetAlertProductAdded(false)}
          />
        )}

        <div className={styles.chats}>
          <h4>Chats for this product</h4>
          {productChats &&
            productChats
              .sort((a, b) => {
                const dateA =
                  a.messages.length > 0
                    ? new Date(a.messages.slice(-1)[0].date)
                    : null;
                const dateB =
                  b.messages.length > 0
                    ? new Date(b.messages.slice(-1)[0].date)
                    : null;

                return dateB - dateA;
              })
              .map((chat) => (
                <div
                  className={styles.chat_item}
                  key={chat._id}
                  onClick={() =>
                    openChat(
                      chat.productId,
                      chat.owner,
                      chat.client,
                      product.name
                    )
                  }
                >
                  <div>
                    <p>Chat with: {chat.client}</p>
                    <p>Last message: {chat.messages.slice(-1)[0].message}</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    )
  );
}

export default DetailProduct;
