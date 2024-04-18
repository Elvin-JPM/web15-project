import { useState } from "react";
import { useEffect } from "react";
import { getData, deleteData } from "../../Api/api";
import getFromStorage from "../../Service/getFromStorage";
import Product from "../ProductPage/Product";
import Button from "../../Components/ui/Button";
import cardStyles from "../MyFavoriteProducts/favorite_products.module.css";
import { NoData } from "../../Components/ui/NoData";

const MyFavoriteProducts = () => {
  const [products, setProducts] = useState([]);
  const [favoriteStatus, setFavoriteStatus] = useState(false);

  const token = getFromStorage("jwt");
  const loggedUser = getFromStorage("username");

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const response = await getData(`/${loggedUser}/favs`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        if (response) {
          setProducts(response);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getFavorites();
  }, [favoriteStatus]);

  const favoriteClick = async (e) => {
    e.preventDefault();
    const favoriteProductId = e.target.getAttribute("id");
    try {
      await deleteData(`/products/${favoriteProductId}`, {
        Authorization: `${token}`,
      });
      setFavoriteStatus(!favoriteStatus);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={cardStyles.main_product_area}>
      <div className={cardStyles.grid}>
        {products.length ? (
          products.map((product) => (
            <Product key={product._id} product={product} styles={cardStyles}>
              <Button
                id={product._id}
                onClick={favoriteClick}
                style={{ backgroundColor: "#FA7070", marginTop: "1rem" }}
              >
                {"Unmark Favorite"}
              </Button>
            </Product>
          ))
        ) : (
          <div className="flex min-h-[500px] items-center justify-center">
            <NoData description="No data to display" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavoriteProducts;
