
import { useParams,  } from 'react-router-dom';

import { useState, useEffect } from 'react';
import DetailProductForm from './DetailProductForm';
import { getData } from "../../Api/api";
import storage from "../../Api/storage";


function DetailProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  console.log(product)

  useEffect(() => {
    const isLogged = storage.get("jwt");
    console.log('tokeeeen', isLogged)
   
    const fetchProduct = async () =>{
      try {
        const response = await getData(`/products/${productId}`, );
        console.log("response:", response.data);
        storage.set("jwt", response.data.jwt);
        console.log('tokeeeen',  storage.set("jwt", response.data.jwt))
        setProduct(response.data)
        console.log('entro al detalle')
      } catch (error) {
        console.log(error.message);
      }
    }
  
    fetchProduct()
     
  }, [productId]);


  return (
    product && (
      <DetailProductForm
      {...product}
      />
      )
  );
}

export default DetailProduct;
