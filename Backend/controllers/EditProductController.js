const { getUserInfo } = require("../lib/authUtils");
const sendEmail = require('../lib/sendEmailUtils');
const User = require('../models/User');
const Product = require("../models/Product");

class EditProductController {
  async editProduct(req, res, next) {
    try {
      const productId = req.params.id;
      const { name, photo, description, sale, price, tags, date } = req.body;
      
      const product = await Product.findById(productId);

       // If products doesnt exist show an error
       if (!product) {
        return res.json('Producto no encontrado' );
      }

      // Check user's logged info
      const { username } = await getUserInfo(req);

      if (product.owner !== username) {
        return res.json('Permisos no válidos');
      }

      // If owner is correct update product
      if ( name ) product.name = name;
      if ( photo ) product.photo = photo;
      if ( description ) product.description = description;
      if ( sale ) product.sale = sale;
      if ( price ) product.price = price;
      if ( tags ) product.tags = tags;
      if ( date ) product.date = date;

      await product.save();

      // If product's price change send an email to users favs
      if ( price ) {
        for ( let i = 0; i < product.favs.length; i++ ){
          const userfav = product.favs[i];
          const user = await User.findOne({ username: userfav });
          const userEmail = user.email;
          const emailHTML = 
          `<p>Hola ${user.username},</p>
          <p>Te informamos que el artículo "<b>${product.name}</b>" que marcaste como favorito ha experimentado un cambio en su precio.
          Por favor, visita nuestro sitio web para ver los detalles actualizados.</p>
          <p>¡Gracias por tu interés!</p>
          <p>Atentamente,
          Fleapster<p>`;

          sendEmail(userEmail,'Actualización de precio del artículo favorito',emailHTML);
        } 
      }

      res.json(product);
      
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EditProductController;