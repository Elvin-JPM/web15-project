import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmptyList from "./EmptyList";
import Product from "./Product";
import { getData } from "../../Api/api";

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

  // const handleButton = () => {
  //   navigate("/products/new");
  // };

  return (
    <section className="px-4 py-8 mx-auto max-w-md font-sans antialiased">
      <div className="container mx-auto px-4">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/products/${product._id}/${product.name}`}
              >
                <Product product={product} />
              </Link>
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
