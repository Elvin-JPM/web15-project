import React from "react";
import { Link } from "react-router-dom";

function DetailProductForm({
  name,
  sale,
  price,
  tags,
  owner,
  photo,
  onDelete,
  isLoading,
}) {
  return (
    <div>
      <p>{name}</p>
      <p>{sale ? "Sell" : "Buy"}</p>
      <p>{tags.join(", ")}</p>
      <p>{price}</p>
      <Link to={`/products/list/${owner}`}>
        <p>{owner}</p>
      </Link>
    </div>
  );
}

export default DetailProductForm;
