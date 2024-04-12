import React from "react";
import {
  Card,
  CardTitle,
  CardContent,
} from "../../Components/ui/CardComponent";
import getFromStorage from "../../Service/getFromStorage";
import placeholder from "../../Assets/placeholder.png";

const IMAGE_BASE_URL = import.meta.env.VITE_APP_IMAGES_URL;

function Product({ product, styles, children }) {
  const loggedUser = getFromStorage("username");
  const imageUrl = product.photo
    ? `${IMAGE_BASE_URL}${product.photo}`
    : placeholder;

  const handleImageError = (event) => {
    event.target.src = placeholder; // Set placeholder if image fails to load
  };
  return (
    <div className={styles.card}>
      <Card key="1">
        <CardTitle className={styles.card_title}>
          <img
            src={imageUrl}
            alt={product.name}
            onError={handleImageError}
            className={styles.product_image}
          />
          <span className={styles.sale}>
            {product.sale ? "For Sale" : "Looking to buy"}
          </span>
        </CardTitle>
        <CardContent className={styles.card_content}>
          <p>by: {product.owner}</p>

          <p className={styles.descriptionText}>{product.description}</p>

          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {product.price}€
          </h3>
          <p className="mt-1.5 text-sm text-gray-700">{product.name}</p>
          {children}
        </CardContent>
      </Card>
    </div>
  );
}

export default Product;
