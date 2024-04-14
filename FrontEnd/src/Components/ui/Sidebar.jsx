import Icon from "./Icon";
import Button from "./Button";
import Label from "./Label";
import { NavLink } from "react-router-dom";
import logout from "../../Service/logout";
import { useNavigate } from "react-router";
import { useState } from "react";
import getFromStorage from "../../Service/getFromStorage";
import styles from "../ui/sidebar.module.css";

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
    <aside className={styles.sidebar}>
      <nav role="navigation" className={styles.nav}>
        <Label className="text-md text-gray-500 pb-5">
          {username ? ` Hello ${username}` : ""}
        </Label>

        <NavLink
          to="/products/new"
          // className={`mr-5 hover:text-gray-900`}
          style={({ isActive }) => ({
            borderBottom: isActive ? "4px solid #54acb4" : "",
            //backgroundColor: isActive ? "#54acb4" : "",
            transform: isActive ? "skewX(-4deg)" : "",
            //color: isActive ? "white" : "",
            padding: "3px",
            fontWeight: isActive ? "500" : "",
          })}
        >
          Create Ad
        </NavLink>
        <NavLink
          to="/products/list/me"
          className={`mr-5 hover:text-gray-900`}
          style={({ isActive }) => ({
            borderBottom: isActive ? "4px solid #54acb4" : "",
            //backgroundColor: isActive ? "#54acb4" : "",
            transform: isActive ? "skewX(-4deg)" : "",
            //color: isActive ? "white" : "",
            padding: "3px",
            fontWeight: isActive ? "500" : "",
          })}
        >
          My Ads
        </NavLink>
        <NavLink
          to={`/${username}/favs`}
          className={`mr-5 hover:text-gray-900`}
          style={({ isActive }) => ({
            borderBottom: isActive ? "4px solid #54acb4" : "",
            //backgroundColor: isActive ? "#54acb4" : "",
            transform: isActive ? "skewX(-4deg)" : "",
            //color: isActive ? "white" : "",
            padding: "3px",
            fontWeight: isActive ? "500" : "",
          })}
        >
          Favorites
        </NavLink>

        <div className="">
          <Button
            type="submit"
            name={token ? "logout" : "login"}
            onClick={buttonClick}
          >
            {token ? "Logout" : "Regístrate o inicia sesión"}
          </Button>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
