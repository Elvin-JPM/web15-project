import React, { useState, useEffect } from "react";
import Product from "../ProductPage/Product";
import { useNavigate, useParams } from "react-router";
import { deleteData, getData, putData } from "../../Api/api";
import Button from "../../Components/ui/Button";
import getFromStorage from "../../Service/getFromStorage";
import SweetAlert from "../../Components/ui/SweetAlert";
import cardStyles from "../MyProducts/my_products.module.css";
import Icon from "../../Components/ui/Icon";

const MyProducts = () => {
  const [showSweetAlert, setShowSweetAlert] = useState(false);
  const [products, setProducts] = useState([]);
  const [reloadProducts, setReloadProducts] = useState(false);
  const navigate = useNavigate();

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // Estado para mostrar el cuadro de diálogo de confirmación
  const [productIdToDelete, setProductIdToDelete] = useState(null); // Estado para almacenar el ID del producto a eliminar

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

  // Función para mostrar el cuadro de diálogo de confirmación antes de borrar el producto
  const confirmDeleteProduct = (productId) => {
    setProductIdToDelete(productId);
    setShowDeleteConfirmation(true);
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
    <section className="container mx-auto font-sans antialiased pt-2">
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Product key={product._id} product={product} styles={cardStyles}>
            <div className={cardStyles.buttons}>
              <Button
                id={product._id}
                onClick={() => navigate(`/edit/${product._id}/${product.name}`)}
              >
                Editar producto
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
                {product.sold
                  ? "Desmarcar como vendido"
                  : "Marcar como vendido"}
              </Button>
              <Button
                id={product._id}
                onClick={() => confirmDeleteProduct(product._id)}
                style={{ backgroundColor: "#FA7070" }}
              >
                Borrar producto
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
      {/* Cuadro de diálogo de confirmación */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-lg">
            <p>¿Estás seguro que deseas eliminar este producto?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => deleteProduct(productIdToDelete)}
              >
                Confirmar
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyProducts;
