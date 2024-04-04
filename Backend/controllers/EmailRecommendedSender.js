const User = require('../models/User');
const Product = require('../models/Product');
const sendEmail = require('../lib/sendEmailUtils');

class SendRecommendedProductsEmail {
  async send() {
    try {
      const users = await User.find();
      const products = await Product.find();

      for (const user of users) {
        const favTags = [];
        const favsId = [];

        for (const product of products) {
          if (product.favs.includes(user.username)) {
            for (const tag of product.tags) {
              if (!favTags.includes(tag)) {
                favTags.push(tag);
              }
            }
            favsId.push(product._id);
          }
        }

        const recommendedProducts = await Product.find({
          tags: { $in: favTags }, // Productos que contienen etiquetas favoritas
          _id: { $nin: favsId } // Excluir productos marcados como favoritos para el usuario
        });

        if (recommendedProducts.length > 0) {
          const userEmail = user.email;
          let emailHTML = `<p>Hola ${user.username},</p>
                           <p>Basándonos en tus productos favoritos, hemos preparado algunas recomendaciones para ti:</p>
                           <ul>`;
              recommendedProducts.forEach(product => {
              const productURL = `http://localhost:5173/products/${product.name}/${product._id}`;
              emailHTML += `<li><a href="${productURL}">${product.name}</a></li>`;
          });
          emailHTML += `</ul>
                        <p>Gracias</p>
                        <p>Atentamente,</p>
                        <p>Fleapster</p>`;
          
          sendEmail(userEmail, "Productos Recomendados", emailHTML);
          console.log("Emails enviados correctamente");
        } else {
          console.log(`No hay productos recomendados para ${user.username}`);
        }
      }
    } catch (error) {
      console.error('Error al enviar correos electrónicos:', error);
    }
  }
}

module.exports = SendRecommendedProductsEmail;
