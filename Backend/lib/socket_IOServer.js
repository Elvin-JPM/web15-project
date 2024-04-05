const socketIo = require("socket.io");
const User = require("../models/User");
let usersSockets = [];

function configureSocket(server) {
  const io = socketIo(server, {
    cors: {
      origin: "*",
    },
  });

  let ownerUsername = "";

  // Create a listener for Sockets.IO's events
  io.on("connection", (socket) => {

    socket.on("setSocketUsername", async (username) => {
      socket.username = username;
      await User.findOneAndUpdate({ username }, { activeSocketIO: true });
      usersSockets.push({ id: socket.id, username: username });
    });

    socket.on("setReceiverUsername", async (receiverUsername) => {
      socket.receiverUsername = receiverUsername;
      usersSockets.push({ id: socket.id, username: receiverUsername });
      console.log("Usuario receptor", socket.id, socket.receiverUsername);
      ownerUsername = receiverUsername;
    });

    socket.on("setSocketActive", () => {
      socket.active = true;
      console.log(`Usuario ${socket.username} conectado`);
    });

    socket.on("hello", (arg, callback) => {
      console.log(arg); // "world"
      callback("got it");
    });

    socket.on("chat message", (msg) => {
      const socketId = findSocketId(socket.receiverUsername);
      io.to(socketId).emit("chat message", msg);
    });

    // Disconnect event
    socket.on("disconnect", async () => {
      await User.findOneAndUpdate(
        { username: socket.username },
        { activeSocketIO: false }
      );
      usersSockets = usersSockets.filter(
        (userSocket) => userSocket.username !== socket.username
      );
      console.log(`Usuario ${socket.username} desconectado`);
    });
  });

  setInterval(() => {
    let activeSockets = 0;
    io.sockets.sockets.forEach((socket) => {
      if (socket.active) {
        activeSockets++;
      }
    });
    console.log(`Número de sockets activos: ${activeSockets}`);
  }, 10000);

  return io;
}

function sendNotificationsToActiveUsers(username, eventName) {
  const socketId = findSocketId(username); // Cambié la variable de socket a socketId
  if (socketId) {
    // Emitir el evento solo al socket del usuario específico
    global.io.to(socketId).emit(eventName);
    console.log(`Evento "${eventName}" enviado al usuario ${username}.`);
  } else {
    console.log(
      `Usuario ${username} no encontrado o no tiene un socket activo.`
    );
  }
}

function findSocketId(username) {
  for (const userSocket of usersSockets) {
    if (userSocket.username === username) {
      return userSocket.id;
    }
  }
  return null;
}

module.exports = {
  configureSocket,
  sendNotificationsToActiveUsers,
};
