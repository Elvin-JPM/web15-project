const { getUserInfo } = require("../lib/authUtils");
const Product = require("../models/Product");
const User = require('../models/User');
const sendEmail = require('../lib/sendEmailUtils');
const { sendNotificationsToActiveUsers } = require('../lib/socket_IOServer');

class ProductReservedController {
  async checkReservedProduct(req, res) {
    const productId = req.params.id;
    console.log(productId)
  
    try {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json("Producto no encontrado" );
      }

       // Check user's logged info
      const { username } = await getUserInfo(req);
      if (product.owner !== username) {
         return res.status(401).json('Permisos no válidos');
      }
      
      await Product.findOneAndUpdate({ _id: productId }, { reserved: true })
<<<<<<< HEAD
      
      for (let i = 0; i < product.favs.length; i++) {
        const userfav = product.favs[i];
        console.log(userfav)
=======

      // Send email to users who have marked this product as a favorite.
      /*for ( let i = 0; i < product.favs.length; i++ ){
        const userfav = product.favs[i];
        const user = await User.findOne({ username: userfav });
        const userEmail = user.email;
        const emailHTML = 
        `<p>Hola ${user.username},</p>
        <p>Queríamos informarte que el artículo "<b>${product.name}</b>" que marcaste como favorito ha sido reservado por otro usuario.</p>
        <p>Te animamos a explorar otros productos similares en nuestro sitio web.</p>
        <p>¡Gracias por tu interés y esperamos que encuentres lo que buscas!</p>
        <p>Atentamente,
        Fleapster</p>`;

        await sendEmail(userEmail,'Artículo favorito marcado como reservado',emailHTML);
      } */

      // If product's price change send an email to users favs
      
      for (let i = 0; i < product.favs.length; i++) {
        const userfav = product.favs[i];
>>>>>>> 5d1f2bc9574fb5efac5b8918a417fbfbe4d99d08
        const user = await User.findOne({ username: userfav });

        if ( user.activeSocketIO === false ){
          const userEmail = user.email;
          const emailHTML = 
          `<p>Hola ${user.username},</p>
          <p>Queríamos informarte que el artículo "<b>${product.name}</b>" que marcaste como favorito ha sido reservado por otro usuario.</p>
          <p>Te animamos a explorar otros productos similares en nuestro sitio web.</p>
          <p>¡Gracias por tu interés y esperamos que encuentres lo que buscas!</p>
          <p>Atentamente,
          Fleapster</p>`

          await sendEmail(
            userEmail,
            "Artículo favorito marcado como reservado",
            emailHTML
          );
        }
        sendNotificationsToActiveUsers(user.username,'reservedProduct');
      }
      res.json('Producto marcado como reservado');

    } catch (error) {
      res
        .status(500)
        .json("Error al marcar el producto como reservado");
    }
  }

  async uncheckReservedProduct(req, res) {
    const productId = req.params.id;

    try {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      // Check user's logged info
      const { username } = await getUserInfo(req);
      if (product.owner !== username) {
         return res.status(401).json('Permisos no válidos');
      }

      await Product.findOneAndUpdate({ _id: productId }, { reserved: false });
      res.json('Producto desmarcado como reservado');
      
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Error al desmarcar el producto como reservado" });
    }
  }
}

module.exports = ProductReservedController;