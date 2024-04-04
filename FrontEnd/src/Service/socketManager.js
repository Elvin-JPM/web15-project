<<<<<<< HEAD
import socketIo from 'socket.io-client';

let socket;

export const initializeSocket = (username) => {
  socket = socketIo('http://localhost:3000');
  socket.emit('setSocketUsername',username);
  socket.emit('setSocketActive')
  
  socket.on('productPriceEdited', ()=>{
    alert('Cambio de precio en uno de tus artículos favoritos');
  });

  socket.on('reservedProduct', ()=>{
    alert('Producto favorito marcado como reservado');
  });

  socket.on('soldProduct', ()=>{
    alert('Producto favorito vendido');
=======
import socketIo from "socket.io-client";

let socket;

const SOCKET_IO_URL = import.meta.env.VITE_APP_SOCKET_IO_URL;

export const initializeSocket = (username) => {
  socket = socketIo(SOCKET_IO_URL);
  socket.emit("setSocketUsername", username);
  socket.emit("setSocketActive");

  socket.on("productPriceEdited", () => {
    alert("Cambio de precio en uno de tus artículos favoritos");
  });

  socket.on("reservedProduct", () => {
    alert("Producto favorito marcado como reservado");
  });

  socket.on("soldProduct", () => {
    alert("Producto favorito vendido");
>>>>>>> 5d1f2bc9574fb5efac5b8918a417fbfbe4d99d08
  });
};

export const getSocket = () => {
  if (!socket) {
    initializeSocket();
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket && socket.connected) {
    socket.disconnect();
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> 5d1f2bc9574fb5efac5b8918a417fbfbe4d99d08
