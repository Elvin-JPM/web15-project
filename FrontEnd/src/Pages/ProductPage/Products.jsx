import {useState, useEffect} from 'react'
import { EmptyList, ProductsList } from '.';
import { getData } from "../../Api/api";


const Products = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
  const proyectsUser = async () =>{
    try {
      const response = await getData("/products", );
      console.log("response:", response.data);
      setProducts(response.data)
    } catch (error) {
      console.log(error.message);
    }
  }

  proyectsUser()
   
}, []);

  return(
    <>
    { products.length > 0  ? (
       <ProductsList products={products} />
    ) : (
       <EmptyList />
    ) }
  </>
  );
};

export default Products;
