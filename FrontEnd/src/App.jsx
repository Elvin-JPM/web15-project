import { Routes, Route, BrowserRouter } from "react-router-dom";

import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Layout from './Components/Layout'
import { Products } from "./Pages/ProductPage";
import { NewProduct } from "./Pages/NewProductPage";
import { DetailProduct } from "./Pages/DetailProductPage";
import { RequireAuth } from "./RequireAuth";

function App() {
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route
              path="products"
              element={
                <RequireAuth>
                  <Layout />
                </RequireAuth>
              }
            >
             <Route index element={<Products />} />
             <Route path="new" element={<NewProduct />} />
             <Route path=":advertId" element={<DetailProduct />} />
           </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
