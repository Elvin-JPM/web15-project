import { useState } from "react";
import { useEffect } from "react";
import { getData } from "../../Api/api";
import Header from "../../Components/ui/Header";
import getFromStorage from "../../Service/getFromStorage";
import Product from "../ProductPage/Product";
import Layout from "../../Components/ui/Layout";
const MyFavoriteProducts = () => {
  const [products, setProducts] = useState([]);

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
  }, []);

  return (
    <div>
      {products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
};

export default MyFavoriteProducts;
