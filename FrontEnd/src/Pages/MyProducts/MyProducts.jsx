import React, { useState, useEffect } from "react";
import Product from "../ProductPage/Product";
import { useNavigate, useParams } from "react-router";
import { deleteData, getData, putData } from "../../Api/api";
import Button from "../../Components/ui/Button";
import getFromStorage from "../../Service/getFromStorage";
import SweetAlert from "../../Components/ui/SweetAlert";

const MyProducts = () => {
  const [showSweetAlert, setShowSweetAlert] = useState(false); 
  const [products, setProducts] = useState([]);
  const [reloadProducts, setReloadProducts] = useState(false);
  const navigate = useNavigate();


  const username = getFromStorage("username");
  const token = getFromStorage("jwt");

  // Carga el listado de mis anuncios
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
  }, [reloadProducts]);

  useEffect(() => {
    if (localStorage.getItem('mostrarSweetAlert') === 'true') {
      setShowSweetAlert(true)
      localStorage.removeItem('mostrarSweetAlert')
    }
  }, [])

  // Handler para borrar un producto
  const deleteProduct = async (productId) => {
    try {
      const response = await deleteData(`/products/${username}/${productId}`, {
        Authorization: `${token}`,
      });
      response && localStorage.setItem('mostrarSweetAlert', 'true')
      navigate(0);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Opcion

  const handleProductAction = async (product, actionType) => {
    const { _id: productId } = product; // Extract productId from product
    const requestBody = { username, id: productId };
    try {
      const endpoint =
        actionType === "reserve"
          ? product.reserved
            ? `/products/uncheck-reserved/${productId}`
            : `/products/check-reserved/${productId}`
          : product.sold
          ? `/products/uncheck-sold/${productId}`
          : `/products/check-sold/${productId}`;

      await putData(endpoint, requestBody, {
        Authorization: token,
      });

      setReloadProducts(!reloadProducts);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="max-w-3xl mx-auto font-sans antialiased pt-8">
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
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
              onClick={() => handleProductAction(product, "reserve")}
            >
              {product.reserved
                ? "Desmarcar como reservado"
                : "Marcar como reservado"}
            </Button>
            <Button
              id={product._id}
              onClick={() => handleProductAction(product, "sold")}
            >
              {product.sold ? "Desmarcar como vendido" : "Marcar como vendido"}
            </Button>
          </div>
        </Product>
      ))}
    </div>
    {showSweetAlert && (
        <SweetAlert
          title="Producto Borrado"
          text="El producto ha sido borrado exitosamente."
          onConfirm={() => setShowSweetAlert(false)}
        />
      )}
    </section>
  );
};

export default MyProducts;
