import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductTitle from "./ProducTitle";
import Product from "./Product";
import Filters from "../../Components/ui/Filters";
import useProductSearch from "../../Hooks/useProductSearch";
import SweetAlert from "../../Components/ui/SweetAlert";
import getFromStorage from "../../Service/getFromStorage";
import { Skeleton } from "../../Components/skeleton";
import cardStyles from "./product.module.css";
const Products = () => {
  const navigate = useNavigate();
  const [showSweetAlertProductAdded, setShowSweetAlertProductAdded] =
    useState(false);

  const username = getFromStorage("username");

  useEffect(() => {
    if (localStorage.getItem("mostrarSweetAlert") === "true") {
      setShowSweetAlertProductAdded(true);
      localStorage.removeItem("mostrarSweetAlert");
    }
  }, []);

  const [pageNumber, setPageNumber] = useState(1);
  const [selectedTags, setSelectedTags] = useState([]);
  const [filterValues, setFilterValues] = useState({
    name: "",
    sale: "",
    minPrice: "",
    maxPrice: "",
  });

  const query = {
    name: filterValues.name,
    saleParam: filterValues.sale,
    minPrice: filterValues.minPrice,
    maxPrice: filterValues.maxPrice,
    tagsArray: selectedTags,
  };

  const { loading, error, products, hasMore } = useProductSearch(
    query,
    pageNumber
  );

  const observer = useRef();
  const lastProductRef = useCallback(
    (node) => {
      console.log(node);
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const onFilterChange = (e) => {
    setFilterValues({
      ...filterValues,
      [e.target.getAttribute("name")]: e.target.value,
    });

    setPageNumber(1);
  };

  const handleTagsChange = (value) => {
    if (selectedTags.includes(value)) {
      setSelectedTags(selectedTags.filter((option) => option !== value));
    } else {
      setSelectedTags([...selectedTags, value]);
    }

    setPageNumber(1);
  };

  const token = getFromStorage("jwt");
  return (
    <section className={cardStyles.main_section}>
      <div
        className={
          username
            ? cardStyles.main_product_area_logged
            : cardStyles.main_product_area_not_logged
        }
      >
        <Filters
          styles={cardStyles.filters}
          name={filterValues.name}
          minPrice={filterValues.minPrice}
          maxPrice={filterValues.maxPrice}
          sale={filterValues.sale}
          selectedTags={selectedTags}
          onChange={onFilterChange}
          onTagsChange={handleTagsChange}
        />
        {token ? "" : <ProductTitle />}

        <div className={cardStyles.grid}>
          {products.map((product, index) => {
            if (products.length === index + 1) {
              return (
                <div ref={lastProductRef} key={product._id}>
                  <Link to={`/products/${product.name}/${product._id}`}>
                    <Product product={product} styles={cardStyles} />
                  </Link>
                </div>
              );
            } else {
              return (
                <div key={product._id}>
                  <Link to={`/products/${product.name}/${product._id}`}>
                    <Product product={product} styles={cardStyles} />
                  </Link>
                </div>
              );
            }
          })}
        </div>
        <Skeleton loading={loading}></Skeleton>
        {/* <div>{loading && "Loading..."}</div> */}
        <div>{error && "Error..."}</div>

        {showSweetAlertProductAdded && (
          <SweetAlert
            title="Nuevo producto creado"
            text="Cambios guardados exitosamente."
            succeeded={true}
            onConfirm={() => setShowSweetAlertProductAdded(false)}
          />
        )}
      </div>
    </section>
  );
};

export default Products;
