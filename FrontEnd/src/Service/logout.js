import storage from "../Api/storage";

const logout = () => {
  storage.remove("jwt");
  sessionStorage.removeItem("jwt");
  storage.remove("username");
  sessionStorage.removeItem("username");
};

export default logout;
