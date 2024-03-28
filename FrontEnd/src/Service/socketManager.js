import socketIo from 'socket.io-client';

let socket;

export const initializeSocket = (username) => {
  socket = socketIo('http://localhost:4000');
  socket.emit('setSocketUsername',username);
  socket.emit('setSocketActive')
  socket.on('evento', ()=>{
    alert('Hola')
  })
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