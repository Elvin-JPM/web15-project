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
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import SendVerificationEmail from "./Pages/ResetPassword/SendVerificationEmail";
import MyProfile from "./Pages/MyProfile/MyProfile";
import Chat from "./Pages/Chat/Chat";
import { ToastContainer } from "react-toastify";
import "./app.css";
import Notifications from "./Pages/Notifications/Notifications";

function App() {
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route
              path="/mi-perfil"
              element={
                <RequireAuth>
                  <Layout>
                    <MyProfile />
                  </Layout>
                </RequireAuth>
              }
            />
            <Route
              path="/verification-email"
              element={<SendVerificationEmail />}
            />
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
                path=":productName/:productId"
                element={<DetailProduct />}
              />
              <Route path="list/:owner" element={<ProductsByOwner />} />
              <Route path="list/me" element={<MyProducts />} />
            </Route>
            <Route
              path="/edit/:productId/:productName"
              element={
                <RequireAuth>
                  <Layout>
                    <EditProduct />
                  </Layout>
                </RequireAuth>
              }
            />
            <Route
              path="/:owner/favs"
              element={
                <RequireAuth>
                  <Layout>
                    <MyFavoriteProducts />
                  </Layout>
                </RequireAuth>
              }
            ></Route>

            <Route
              path="/chat/:owner/:productName/:productId"
              element={
                <RequireAuth>
                  <Layout>
                    <Chat />
                  </Layout>
                </RequireAuth>
              }
            ></Route>
            <Route
              path="/notifications/:username"
              element={
                <RequireAuth>
                  <Layout>
                    <Notifications />
                  </Layout>
                </RequireAuth>
              }
            ></Route>
          </Routes>
          <ToastContainer className="toastifyCustomized" />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
