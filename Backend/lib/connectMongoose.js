const mongoose = require('mongoose');

mongoose.connection.on('error', err => {
    console.log('Error de conexión',err)
});

mongoose.connection.once('open', () => {
    console.log('Conectado a MongoDB')
});

mongoose.connect('mongodb://127.0.0.1/Fleapster');

module.exports = mongoose.connection;