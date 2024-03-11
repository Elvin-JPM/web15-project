import { Routes, Route, BrowserRouter } from "react-router-dom";

import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
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
