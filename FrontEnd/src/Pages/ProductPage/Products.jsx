import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { EmptyList, ProductsList } from '.';
import { getData } from "../../Api/api";
import Button from '../../Components/ui/Button'

const Products = () => {
  const navigate = useNavigate();
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

const handleButton =()=>{
  navigate('/products/new');
}

  return(
    <div className="container mx-auto px-4">
    <Button onClick={handleButton}>
      Nuevo producto
    </Button>
   {products.length > 0  ? (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
     <ProductsList products={products} />
     </div>
  ) : (
     <EmptyList />
  ) }
</div>
  );
};

export default Products;
