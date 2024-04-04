import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmptyList from "./EmptyList";
import ProductTitle from "./ProducTitle";
import { getData } from "../../Api/api";
import Product from "./Product";
import Filters from "../../Components/ui/Filters";
import FilteredProducts from "./FilteredProducts";
import useProductSearch from "../../Hooks/useProductSearch";
import SweetAlert from "../../Components/ui/SweetAlert";
import { Skeleton } from "../../Components/skeleton";

const Products = () => {
  const navigate = useNavigate();

  const [showSweetAlertProductAdded, setShowSweetAlertProductAdded] = useState(false); 

 useEffect(() => {
    if (localStorage.getItem('mostrarSweetAlert') === 'true') {
      setShowSweetAlertProductAdded(true)
      localStorage.removeItem('mostrarSweetAlert')
    }
  }, [])

  //const [products, setProducts] = useState([]);
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

  // useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       setLoading(true);
  //       setError(false);
  //       const response = await getData(`/products?page=${pageNumber}`);
  //       console.log(response.data);
  //       setProducts((prevProducts) => {
  //         return [...new Set([...prevProducts, ...response.data])];
  //       });
  //       setLoading(false);
  //     } catch (error) {
  //       console.log("Error fetching data:", error.message);
  //       setLoading(false);
  //       setError(true);
  //     }
  //   };

  //   getProducts();
  // }, [pageNumber, getData]);

  return (
<<<<<<< HEAD
    <section className="max-w-5xl mx-auto font-sans antialiased">
=======
    <section className="xl:max-w-7xl lg:max-w-5xl md:max-w-3xl sm:max-w-lg xs:max-w-xs mx-auto font-sans antialiased">
>>>>>>> 5d1f2bc9574fb5efac5b8918a417fbfbe4d99d08
      <Filters
        name={filterValues.name}
        minPrice={filterValues.minPrice}
        maxPrice={filterValues.maxPrice}
        sale={filterValues.sale}
        selectedTags={selectedTags}
        onChange={onFilterChange}
        onTagsChange={handleTagsChange}
      />
      <ProductTitle />

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product, index) => {
          if (products.length === index + 1) {
            return (
              <div ref={lastProductRef} key={product._id}>
                <Link to={`/products/${product.name}/${product._id}`}>
                  <Product product={product} />
                </Link>
              </div>
            );
          } else {
            return (
              <div key={product._id}>
                <Link to={`/products/${product.name}/${product._id}`}>
                  <Product product={product} />
                </Link>
              </div>
            );
          }
        })}
      </div>
      <Skeleton
        loading={
         loading
         }
      ></Skeleton>
      {/* <div>{loading && "Loading..."}</div> */}
      <div>{error && "Error..."}</div>

      {/* {products.length > 0 ? (
        <FilteredProducts
          productsList={products}
          filterName={filterValues.name}
          filterMinPrice={filterValues.minPrice}
          filterMaxPrice={filterValues.maxPrice}
          filterSale={filterValues.sale}
          filterSelectedTags={selectedTags}
        />
      ) : (
        <EmptyList />
      )} */}
      {showSweetAlertProductAdded && (
        <SweetAlert
          title="Nuevo producto creado"
          text="Cambios guardados exitosamente."
          succeeded={true}
          onConfirm={() => setShowSweetAlertProductAdded(false)}
        />
      )}
    </section>
  );
};

export default Products;
