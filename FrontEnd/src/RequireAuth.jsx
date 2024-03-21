import { Navigate, useLocation } from "react-router";
import storage from "./Api/storage";
import getFromStorage from "./Service/getFromStorage";

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isLogged = getFromStorage("jwt");

  return isLogged ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};
