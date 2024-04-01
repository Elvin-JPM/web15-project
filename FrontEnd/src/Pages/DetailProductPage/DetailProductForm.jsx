import React from "react";
import { Link } from "react-router-dom";
import getFromStorage from "../../Service/getFromStorage";
import Button from "../../Components/ui/Button";
function DetailProductForm({
  name,
  sale,
  price,
  tags,
  owner,
  favs,
  _id,
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
