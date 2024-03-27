//import io from 'socket.io-client';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Navigate } from "react-router";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Layout from "./Components/ui/Layout";
import Products from "./Pages/ProductPage/Products";
import { NewProduct } from "./Pages/NewProductPage";
import { DetailProduct } from "./Pages/DetailProductPage";
import { EditProduct } from "./Pages/EditProductPage";
import { RequireAuth } from "./RequireAuth";
import MyProducts from "./Pages/MyProducts/MyProducts";
import ProductsByOwner from "./Pages/ProductsByOwner/ProductsByOwner";
import MyFavoriteProducts from "./Pages/MyFavoriteProducts/MyFavoriteProducts";

// const socket = io("http://localhost:4000");

function App() {
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Layout />}>
              <Route index element={<Products />} />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewProduct />
                  </RequireAuth>
                }
              />
              <Route
                path=":productId/:productName"
                element={<DetailProduct />}
              />
              <Route path="list/:owner" element={<ProductsByOwner />} />
              <Route path="list/me" element={<MyProducts />} />
              <Route path=":productId/edit" element={<EditProduct />} />
            </Route>
            <Route
              path="/:owner/favs"
              element={
                <RequireAuth>
                  <MyFavoriteProducts />
                </RequireAuth>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
