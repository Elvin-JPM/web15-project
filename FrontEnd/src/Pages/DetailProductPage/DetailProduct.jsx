import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import DetailProductForm from "./DetailProductForm";
import { getData } from "../../Api/api";

function DetailProduct() {
  const { productId, productName } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getData(`/products/${productId}/${productName}`);
        setProduct(response);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProduct();
  }, [productId]);

  return product && <DetailProductForm {...product} />;
}

export default DetailProduct;
