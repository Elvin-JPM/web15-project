import { Navigate, useLocation } from "react-router";
import storage from "./Api/storage";

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isLogged = storage.get("jwt");

  return isLogged ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};
