import Icon from "./Icon";
import Button from "./Button";
import { NavLink } from "react-router-dom";
import Input from "./Input";
import storage from "../../Api/storage";

function Header() {
  const localStorage = storage.get("jwt");
  const session = sessionStorage.getItem("jwt");
  const token = localStorage || session;
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <NavLink
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <Icon />
        </NavLink>
        <Input />
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <NavLink to="New" className="mr-5 hover:text-gray-900">
            Crear Anuncio{" "}
          </NavLink>
          <NavLink to="" className="mr-5 hover:text-gray-900">
            Mis Anuncios
          </NavLink>
          <NavLink to="" className="mr-5 hover:text-gray-900">
            Favoritos
          </NavLink>
          <NavLink to="" className="mr-5 hover:text-gray-900">
            Fourth Link
          </NavLink>
        </nav>
        {token ? (
          <Button type="submit">Log Out</Button>
        ) : (
          <Button type="submit">Log In</Button>
        )}
      </div>
    </header>
  );
}

export default Header;
