import React, { useState, useEffect } from "react";
import Product from "../ProductPage/Product";
import { useNavigate, useParams } from "react-router";
import { deleteData, getData, putData } from "../../Api/api";
import Button from "../../Components/ui/Button";
import getFromStorage from "../../Service/getFromStorage";
import SweetAlert from "../../Components/ui/SweetAlert";
import cardStyles from "../MyProducts/my_products.module.css";
import AlertDialog from "../../Components/ui/AlertDialog";
import { NoData } from "../../Components/ui/NoData";

const MyProducts = () => {
  const [showSweetAlert, setShowSweetAlert] = useState(false);
  const [products, setProducts] = useState([]);
  const [reloadProducts, setReloadProducts] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

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
    if (localStorage.getItem("mostrarSweetAlert") === "true") {
      setShowSweetAlert(true);
      localStorage.removeItem("mostrarSweetAlert");
    }
  }, []);

  // Handler para borrar un producto
  const deleteProduct = async (productId) => {
    try {
      const response = await deleteData(`/products/${username}/${productId}`, {
        Authorization: `${token}`,
      });
      response && localStorage.setItem("mostrarSweetAlert", "true");
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
    <section className={cardStyles.main_section}>
      <div className={cardStyles.main_product_area}>
        <div className={cardStyles.grid}>
          {products.length ? (
            products.map((product) => (
              <Product key={product._id} product={product} styles={cardStyles}>
                <div className={cardStyles.buttons}>
                  <Button
                    id={product._id}
                    onClick={() =>
                      navigate(`/edit/${product._id}/${product.name}`)
                    }
                  >
                    Edit Product
                  </Button>
                  <Button
                    id={product._id}
                    onClick={() => handleProductAction(product, "reserve")}
                  >
                    {product.reserved
                      ? "Unmark as reserved"
                      : "Mark as reserved"}
                  </Button>
                  <Button
                    id={product._id}
                    onClick={() => handleProductAction(product, "sold")}
                  >
                    {product.sold ? "Unmark as sold" : "Mark as sold"}
                  </Button>
                  <Button
                    id={product._id}
                    onClick={() => setProductIdToDelete(product._id)}
                    style={{ backgroundColor: "#FA7070" }}
                  >
                    Delete Product
                  </Button>
                </div>
              </Product>
            ))
          ) : (
            <div className="flex min-h-[500px] items-center justify-center">
              <NoData description="No data to display" />
            </div>
          )}
        </div>
        {showSweetAlert && (
          <SweetAlert
            title="Producto Borrado"
            text="El producto ha sido borrado exitosamente."
            onConfirm={() => setShowSweetAlert(false)}
          />
        )}
        {/* Cuadro de diálogo de confirmación */}
        {productIdToDelete && (
          <AlertDialog
            text="¿Estás seguro que deseas eliminar este producto?"
            onConfirm={() => {
              deleteProduct(productIdToDelete);
              setProductIdToDelete(null); // Limpiar el productIdToDelete después de confirmar
            }}
            onCancel={() => setProductIdToDelete(null)} // Limpiar el productIdToDelete si se cancela
          />
        )}
      </div>
    </section>
  );
};

export default MyProducts;
