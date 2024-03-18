import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { EmptyList, Product } from ".";
import EmptyList from "./EmptyList";
import Product from "./Product";
import { getData } from "../../Api/api";
import Button from "../../Components/ui/Button";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await getData("/products");
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getProducts();
  }, []);

  const handleButton = () => {
    navigate("/products/new");
  };

  return (
    <section className="px-4 py-8 mx-auto max-w-md font-sans antialiased">
      <div className="container mx-auto px-4">
        {/* <Button onClick={handleButton}>
      Nuevo producto
    </Button> */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyList />
        )}
      </div>
    </section>
  );
};

export default Products;
