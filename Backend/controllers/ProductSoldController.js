const { getUserInfo } = require("../lib/authUtils");
const Product = require("../models/Product");
const User = require('../models/User');
const sendEmail = require('../lib/sendEmailUtils');
const { sendNotificationsToActiveUsers } = require('../lib/socket_IOServer');

class ProductSoldController {
  async checkSoldProduct(req, res) {
    const productId = req.params.id

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
      
      await Product.findOneAndUpdate({ _id: productId }, { sold: true });

      for (let i = 0; i < product.favs.length; i++) {
        const userfav = product.favs[i];
        const user = await User.findOne({ username: userfav });

        if ( user.activeSocketIO === false ){
          const userEmail = user.email;
          //const productURL = `http://localhost:5173/products/${product.name}/${product._id}`;
          const productURL = `http://ec2-44-203-155-213.compute-1.amazonaws.com/products/${product.name}/${product._id}`;
          const emailHTML = 
          `<p>Hola ${user.username},</p>
          <p>Queríamos informarte que el artículo <b><a href="${productURL}">${product.name}</a></b> que marcaste como favorito ha sido vendido recientemente.</p>
          <p>Te animamos a explorar otros productos similares en nuestro sitio web.</p>
          <p>¡Gracias por tu interés y esperamos que encuentres lo que buscas!</p>
          <p>Atentamente,
          Fleapster</p>`;

          sendEmail(
            userEmail,
            "Artículo favorito marcado como vendido",
            emailHTML
          );
        }
        sendNotificationsToActiveUsers(user.username,'soldProduct');
      }

      res.json('Producto marcado como vendido');

    } catch (error) {
      res
        .status(500)
        .json("Error al marcar el producto como vendido");
    }
  }

  async uncheckSoldProduct(req, res) {
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

      await Product.findOneAndUpdate({ _id: productId }, { sold: false });
      res.json('Producto desmarcado como vendido');

    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Error al desmarcar el producto como vendido" });
    }
  }
}

module.exports = ProductSoldController;