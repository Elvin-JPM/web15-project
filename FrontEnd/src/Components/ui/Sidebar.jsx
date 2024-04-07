import Icon from "./Icon";
import Button from "./Button";
import Label from "./Label";
import { NavLink } from "react-router-dom";
import logout from "../../Service/logout";
import { useNavigate } from "react-router";
import { useState } from "react";
import getFromStorage from "../../Service/getFromStorage";

function Sidebar() {
  const [isLogged, setIsLogged] = useState(null);
  const navigate = useNavigate();

  const token = getFromStorage("jwt");
  const username = getFromStorage("username");

  const buttonClick = (e) => {
    if (e.target.getAttribute("name") === "login") {
      navigate("/login");
    } else {
      logout();
      setIsLogged(false);
      navigate("/");
    }
  };



  return (
    <aside
    id="sidebar"
    className="fixed border left-0 top-0 z-40 h-full bg-white border-color-gray w-64"
    aria-label="Sidebar"
  >
      <nav
        role="navigation"
        className="m-1 flex h-full flex-col  gap-2 pb-4 pt-20"
      >
         <div className="flex items-center px-1">
          <Button
            //variant="ghost"
            className="inline-flex items-center rounded-lg p-2 text-sm"
            //onClick={() => dispatchMenu({ type: "TOOGLE_MENU" })}
          >
            <span className="sr-only">
              open
            </span>
          </Button>
       
        </div>
        <Label>{username ? ` Hello ${username}` : ""}</Label>
           <NavLink to="/products/new" className="mr-5 hover:text-gray-900">
              Crear Anuncio{" "}
            </NavLink>
            <NavLink
              to="/products/list/me"
              className="mr-5 hover:text-gray-900"
            >
              Mis Anuncios
            </NavLink>
            <NavLink
              to={`/${username}/favs`}
              className="mr-5 hover:text-gray-900"
            >
              Favoritos
            </NavLink>
            <NavLink to="/mi-perfil" className="mr-5 hover:text-gray-900">
              Mi Perfil
            </NavLink>
            
        <div className="flex items-center px-1">
        <Button
          type="submit"
          name={token ? "logout" : "login"}
          onClick={buttonClick}
        >
          {token ? "Cerrar sesión" : "Regístrate o inicia sesión"}
        </Button>
  
        </div>
      </nav>
       
    </aside>
  );
}

export default Sidebar;