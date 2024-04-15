const { getUserInfo } = require("../lib/authUtils");
const sendEmail = require("../lib/sendEmailUtils");
const User = require("../models/User");
const Product = require("../models/Product");
const Jimp = require("jimp");
const upload = require("../lib/uploadConfigure");
const path = require("path");
const fs = require("fs");
const { sendNotificationsToActiveUsers } = require('../lib/socket_IOServer');

class EditProductController {
  async editProduct(req, res, next) {
    try {
      const imagePath = path.resolve(__dirname, "..", "uploads", "final_images");
      if (!fs.existsSync(imagePath)) {
        fs.mkdirSync(imagePath, { recursive: true });
      }

      const productId = req.params.id;
      const product = await Product.findById(productId);

      // If product doesn't exist show an error
      if (!product) {
        return res.json("Producto no encontrado");
      }

      // Check user's logged info
      const usernameURL = req.params.owner;
      const { username } = await getUserInfo(req);

      // Verificar permisos del usuario
      if (product.owner !== usernameURL | usernameURL !== username ) {
        return res.json("Permisos no válidos");
      }

      // Upload product's image
      upload.single("photo")(req, res, async function (err) {
        if (err) {
          return next(err);
        }

        const { name, photo, description, sale, price, tags, date } = req.body;
        const user = await User.findOne({ name: username });
        
        const originalName = req.file ? path.basename(req.file.filename) : null;

        if (req.file) {
          // Resize image with Jimp
          const image = await Jimp.read(req.file.path);
          await image.scaleToFit(300, 200);
          await image.writeAsync(path.join(imagePath, originalName));
          product.photo = originalName;
        }
        console.log("photo:", originalName);

        //If owner is correct update product
        if (name) product.name = name;
        if (description) product.description = description;
        if (sale) product.sale = sale;
        if (price) product.price = price; // Check if price has changed

        const savedProduct = await product.save();

        // If product's price change send an email to users favs
        if (price && (price !== product.price)) { // Only execute if price has changed
          for (let i = 0; i < product.favs.length; i++) {
            const userfav = product.favs[i];
            const user = await User.findOne({ username: userfav });

            if (user.activeSocketIO === false) {
              const userEmail = user.email;
              //const productURL = `http://localhost:5173/products/${product.name}/${product._id}`;
              const productURL = `http://ec2-44-203-155-213.compute-1.amazonaws.com/products/${product.name}/${product._id}`;
              const emailHTML = `<p>Hola ${user.username},</p>
              <p>Te informamos que el artículo <b><a href="${productURL}">${product.name}</a></b> que marcaste como favorito ha experimentado un cambio en su precio.
              <p>Por favor, visita nuestro sitio web para ver los detalles actualizados.</p>
              <p>¡Gracias por tu interés!</p>
              <p>Atentamente,
              Fleapster</p>`;

              sendEmail(
                userEmail,
                "Actualización de precio del artículo favorito",
                emailHTML
              );
            }
            sendNotificationsToActiveUsers(user.username, 'productPriceEdited');
          }
        }
        res.json({ result: savedProduct });
      });
    } catch (err) {
      next(err);
    }
  }
}


module.exports = EditProductController;

