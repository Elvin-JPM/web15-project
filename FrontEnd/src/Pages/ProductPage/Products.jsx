import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import EmptyList from "./EmptyList";
import ProductTitle from "./ProducTitle";
import { getData } from "../../Api/api";
import Filters from "../../Components/ui/Filters";
import FilteredProducts from "./FilteredProducts";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [filterValues, setFilterValues] = useState({
    name: "",
    sale: "",
    minPrice: "",
    maxPrice: "",
  });

  const onFilterChange = (e) => {
    setFilterValues({
      ...filterValues,
      [e.target.getAttribute("name")]: e.target.value,
    });
  };

  const handleTagsChange = (value) => {
    if (selectedTags.includes(value)) {
      setSelectedTags(selectedTags.filter((option) => option !== value));
    } else {
      setSelectedTags([...selectedTags, value]);
    }
  };

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

  return (
    <section className="max-w-3xl mx-auto font-sans antialiased">
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
      {products.length > 0 ? (
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
      )}
    </section>
  );
};

export default Products;
