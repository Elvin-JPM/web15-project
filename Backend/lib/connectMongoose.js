<<<<<<< HEAD
const mongoose = require('mongoose');

mongoose.connection.on('error', err => {
    console.log('Error de conexión',err)
});

mongoose.connection.once('open', () => {
    console.log('Conectado a MongoDB')
});

mongoose.connect('mongodb://127.0.0.1/Fleapster');

=======
const mongoose = require('mongoose');

mongoose.connection.on('error', err => {
    console.log('Error de conexión',err)
});

mongoose.connection.once('open', () => {
    console.log('Conectado a MongoDB')
});

mongoose.connect('mongodb://127.0.0.1/Fleapster');

>>>>>>> 5d1f2bc9574fb5efac5b8918a417fbfbe4d99d08
module.exports = mongoose.connection;