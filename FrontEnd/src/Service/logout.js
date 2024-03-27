import storage from "../Api/storage";
import socket from '../Pages/Login';

const logout = () => {
  storage.remove("jwt");
  sessionStorage.removeItem("jwt");
  storage.remove("username");
  sessionStorage.removeItem("username");
  if (socket) {
    socket.disconnect();
  }
};

export default logout;
