'use strict';

const readline = require('node:readline');
const connection = require('./lib/connectMongoose');
const Product = require('./models/Product');
const initData = require('./initProducts.json');
const User = require('./models/User');

main().catch(err => console.log('Hubo un error', err));

async function main() {

  await new Promise(resolve => connection.once('open', resolve))

  const borrar = await pregunta(
    '¿Estas seguro de que quieres borrar la base de datos y cargar datos iniciales? Si/No   '
  )
  if (!borrar) {
    process.exit();
  }

   // inicializar la colección de usuarios
   await initUsers();

  // inicializar la colección de productos
  await initProducts();

  connection.close();
}

async function initProducts() {
  // delete products
  const deleted = await Product.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} productos`);

  // initial Products
  const inserted = await Product.insertMany(initData.initialProducts);
  console.log(`Creados ${inserted.length} productos.`);
}

function pregunta(texto) {
  return new Promise((resolve, reject) => {
    const ifc = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    ifc.question(texto, respuesta => {
      ifc.close();
      resolve(respuesta.toLowerCase() === 'si');
    })
  });
}

async function initUsers() {
  // delete users
  const deleted = await User.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} usuarios`);

  // initial users
  const inserted = await User.insertMany(
    { username: 'user1', email: 'user1@example.com', password: await User.hashPassword('1234')}
  );
  console.log(`Creados ${inserted.length} usuarios.`);
}