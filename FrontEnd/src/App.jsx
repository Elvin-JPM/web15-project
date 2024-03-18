import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Navigate } from "react-router";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Layout from "./Components/Layout";
// import { Products } from "./Pages/ProductPage";
import Products from "./Pages/ProductPage/Products";
import { NewProduct } from "./Pages/NewProductPage";
import { DetailProduct } from "./Pages/DetailProductPage";
import { EditProduct } from "./Pages/EditProductPage";
import { RequireAuth } from "./RequireAuth";

function App() {
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Layout />}>
              <Route index element={<Products />} />
              <Route path="new" element={<NewProduct />} />
              <Route
                path=":productId/:productName"
                element={<DetailProduct />}
              />
              <Route path=":productId/edit" element={<EditProduct />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
