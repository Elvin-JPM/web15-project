import Icon from "./Icon";
import Button from "./Button";
import Label from "./Label";
import { NavLink } from "react-router-dom";
import Input from "./Input";
import storage from "../../Api/storage";
import logout from "../../Service/logout";
import { useNavigate } from "react-router";
import { useState } from "react";
import getFromStorage from "../../Service/getFromStorage";
import Logo from "./Logo";
import IconUser from "./Icon_user";

function Header() {
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
    <header className="border border-gray-100 fixed top-0 z-50 w-full bg-white px-4 py-2 text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <NavLink
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
        
        <div className="sm:hidden">
          <Icon />
        </div>
        <div className="hidden sm:block md:hidden">
          <Logo />
        </div>
        <div className="hidden md:block">
          <Logo />
        </div>
        </NavLink>
        {token ? (
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
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
            <NavLink to="/mi-perfil" className="mr-5 hover:text-gray-900 w-14 h-14 border rounded-full p-4">
             {username ? <span ><IconUser /></span>  : ""}
            </NavLink>
            {/* <NavLink to="/mi-perfil" className="mr-5 hover:text-gray-900">
              Mi Perfil
            </NavLink> */}
           
          </nav>
        ) : (
          ""
        )}
        {/* <Button
          type="submit"
          name={token ? "logout" : "login"}
          onClick={buttonClick}
        >
          {token ? "Cerrar sesión" : "Regístrate o inicia sesión"}
        </Button> */}
      </div>
    </header>
  );
}

export default Header;
