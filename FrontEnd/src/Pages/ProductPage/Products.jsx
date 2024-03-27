import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmptyList from "./EmptyList";
import ProductTitle from './ProducTitle'
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
    <section className="max-w-3xl mx-auto font-sans antialiased">
        <ProductTitle />
        {products.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/products/${product.name}/${product._id}`}
              >
                <Product product={product} />
              </Link>
            ))}
          </div>
        ) : (
          <EmptyList />
        )}
    </section>
  );
};

export default Products;
