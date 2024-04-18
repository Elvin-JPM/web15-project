const Product = require("../models/Product");
const User = require("../models/User");
const sendEmail = require("../lib/sendEmailUtils");

async function isAdRelevant(productCreated) {
  try {
    const products = await Product.find({
      price: productCreated.price,
      name: { $regex: productCreated.name, $options: "i" },
    });

    if (products.length === 0) {
      console.log("No se encontraron anuncios relevantes.");
    }

    for (const product of products) {
      if (productCreated.owner !== product.owner) {
        try {
          if (
            (productCreated.sale === true && product.sale === false) |
            (productCreated.sale === false && product.sale === true)
          ) {
            const userToSendEmail = await User.findOne({
              username: product.owner,
            });
            const userEmail = userToSendEmail.email;

            let emailHTML = `<p>Hola ${userToSendEmail.username},</p>
                            <p>Basándonos en tus productos publicados te informamos que se ha generado un producto que podría ser de tu interés`;
            const productURL = `http://ec2-44-203-155-213.compute-1.amazonaws.com/products/${productCreated.name}/${productCreated._id}`;
            emailHTML += `<li><a href="${productURL}">${product.name}</a></li>
                          </ul>
                          <p>Gracias</p>
                          <p>Atentamente,</p>
                          <p>Fleapster</p>`;

            sendEmail(userEmail, "Producto de interés", emailHTML);
            console.log(`Email enviado correctamente a ${userEmail}`);
          }
        } catch (error) {
          console.error("Error al buscar el usuario:", error);
        }
      }
    }
  } catch (error) {
    console.error("Error al verificar la relevancia del anuncio:", error);
  }
}

module.exports = { isAdRelevant };
