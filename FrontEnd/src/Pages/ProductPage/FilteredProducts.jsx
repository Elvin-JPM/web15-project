import { Link } from "react-router-dom";
import Product from "./Product";

function FilteredProducts({
  productsList,
  filterName,
  filterMinPrice,
  filterMaxPrice,
  filterSale,
  filterSelectedTags,
}) {
  // If all conditions are met, the product will be included in the array
  const filteredProductsArray = productsList
    .filter(
      (product) =>
        // Filter by name
        (filterName === "" ||
          product.name.toLowerCase().startsWith(filterName.toLowerCase())) &&
        // Filter by price range
        (filterMinPrice === "" ||
          Number(filterMinPrice) <= Number(product.price)) &&
        (filterMaxPrice === "" ||
          Number(filterMaxPrice) >= Number(product.price)) &&
        // Filter by type: selling or buying
        (filterSale === "" ||
          (product.sale ? "For sale" : "Looking to buy") === filterSale) &&
        // Filter by tags
        (filterSelectedTags.length === 0 ||
          filterSelectedTags.some((filterTag) =>
            product.tags
              .map((str) => str.toLowerCase())
              .includes(filterTag.toLowerCase())
          ))
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {filteredProductsArray.map((product) => (
        <Link key={product._id} to={`/products/${product.name}/${product._id}`}>
          <Product product={product} />
        </Link>
      ))}
    </div>
  );
}

export default FilteredProducts;
