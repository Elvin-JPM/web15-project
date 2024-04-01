import socketIo from 'socket.io-client';

let socket;

export const initializeSocket = (username) => {
  socket = socketIo('http://localhost:4000');
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
};