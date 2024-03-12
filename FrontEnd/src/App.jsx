import { Routes, Route, BrowserRouter } from "react-router-dom";

import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
<<<<<<< HEAD
=======
import ProductsList from "../src/Pages/ProductPage/ProductsList";
>>>>>>> 0f3cbb4 (Changing node:readline por readline)
import { Products } from "./Pages/ProductPage";
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
                  <Products />
                </RequireAuth>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
