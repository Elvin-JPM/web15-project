import storage from "../Api/storage";
import { disconnectSocket } from "../Service/socketManager";

const logout = () => {
  storage.remove("jwt");
  sessionStorage.removeItem("jwt");
  storage.remove("username");
  sessionStorage.removeItem("username");
  disconnectSocket();
};

export default logout;
