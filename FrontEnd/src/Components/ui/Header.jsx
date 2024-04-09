import Icon from "./Icon";
import Button from "./Button";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import getFromStorage from "../../Service/getFromStorage";
import Logo from "./Logo";
import IconUser from "./Icon_user";
import { getSocket } from "../../Service/socketManager";
import { getData } from "../../Api/api";

function Header() {
  const [isLogged, setIsLogged] = useState(null);
  const [notifications, setNotifications] = useState(0);
  const navigate = useNavigate();
  let socket = null;

  const token = getFromStorage("jwt");
  const username = getFromStorage("username");

  if (token && username) socket = getSocket();

  const getNotifications = async () => {
    try {
      const newNotifications = await getData(`/notifications/${username}`);
      console.log("Notifications:", newNotifications);
      setNotifications(newNotifications.length);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (token && username) {
      getNotifications();
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("chat message", async (msg) => {
        console.log("Recibiendo en cabecera:", username, msg);
        //getNotifications();
      });
    }
  }, [socket, username]);

  const buttonClick = (e) => {
    navigate("/login");
    // if (e.target.getAttribute("name") === "login") {
    //   navigate("/login");
    // } else {
    //   logout();
    //   setIsLogged(false);
    //   navigate("/");
    // }
  };

  return (
    <header className="border border-gray-100 fixed top-0 z-50 w-full bg-white text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
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

        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-between">
          {token === "" && (
            <Button onClick={buttonClick}>Iniciar sesión</Button>
          )}
          {token && (
            <>
              <NavLink
                to="/products/new"
                className={`mr-5 hover:text-gray-900`}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#54acb4" : "",
                  transform: isActive ? "skewX(-4deg)" : "",
                  color: isActive ? "white" : "",
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
                  backgroundColor: isActive ? "#54acb4" : "",
                  transform: isActive ? "skewX(-4deg)" : "",
                  color: isActive ? "white" : "",
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
                  backgroundColor: isActive ? "#54acb4" : "",
                  transform: isActive ? "skewX(-4deg)" : "",
                  color: isActive ? "white" : "",
                  padding: "3px",
                  fontWeight: isActive ? "500" : "",
                })}
              >
                Favorites
              </NavLink>

              <NavLink
                to={`/${username}/favs`}
                className={`mr-5 hover:text-gray-900`}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#54acb4" : "",
                  transform: isActive ? "skewX(-4deg)" : "",
                  color: isActive ? "white" : "",
                  padding: "3px",
                  fontWeight: isActive ? "500" : "",
                })}
              >
                Notifications <div>{notifications}</div>
              </NavLink>
              <NavLink
                to="/mi-perfil"
                className="mr-5 hover:text-gray-900 w-14 h-14 border rounded-full p-4"
              >
                {username ? (
                  <span>
                    <IconUser />
                  </span>
                ) : (
                  ""
                )}
              </NavLink>
            </>
          )}
        </nav>

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
