import socketIo from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let socket;

const SOCKET_IO_URL = import.meta.env.VITE_APP_SOCKET_IO_URL;

export const initializeSocket = (username) => {
  console.log(SOCKET_IO_URL);
  socket = socketIo(`${SOCKET_IO_URL}`);
  socket.emit("setSocketUsername", username);
  socket.emit("setSocketActive");

  socket.on("productPriceEdited", () => {
    toast.info("Cambio de precio en uno de tus artículos favoritos");
  });

  socket.on("reservedProduct", () => {
    toast.info("Producto favorito marcado como reservado");
  });

  socket.on("soldProduct", () => {
    toast.error("Uno de tus productos favorito ha sido vendido");
  });
};

export const getSocket = (username) => {
  if (!socket) {
    initializeSocket(username);
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket && socket.connected) {
    socket.disconnect();
  }
};
