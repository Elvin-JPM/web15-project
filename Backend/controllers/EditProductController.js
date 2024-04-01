const { getUserInfo } = require("../lib/authUtils");
const sendEmail = require("../lib/sendEmailUtils");
const User = require("../models/User");
const Product = require("../models/Product");
const Jimp = require("jimp"); // Importar Jimp
const upload = require("../lib/uploadConfigure");
const path = require("path");
const fs = require("fs");

class EditProductController {
  async editProduct(req, res, next) {
    try {
      const imagePath = path.resolve(
        __dirname,
        "..",
        "uploads",
        "final_images"
      );
      if (!fs.existsSync(imagePath)) {
        fs.mkdirSync(imagePath, { recursive: true });
      }

      const productId = req.params.id;
      console.log("product id: ", productId);
      // console.log(req);
      const product = await Product.findById(productId);
      console.log("this is the product: ", product);
      // If products doesnt exist show an error
      if (!product) {
        return res.json("Producto no encontrado");
      }

      // Check user's logged info
      //const { username } = await getUserInfo(req);
      const username = req.params.owner;
      console.log("username backend: ", username);
      if (product.owner !== username) {
        return res.json("Permisos no válidos");
      }

      // Upload product's image if exists
      if (req.file) {
        upload.single("photo")(req, res, async function (err) {
          if (err) {
            return next(err);
          }

          const { name, photo, description, sale, price, tags, date } = req.body;

          // Resize image with Jimp
          const originalName = path.basename(req.file.filename);
          const image = await Jimp.read(req.file.path);
          await image.scaleToFit(300, 200);
          await image.writeAsync(path.join(imagePath, originalName));
          product.photo = originalName;
        });
      }

      // Update product details
      const { name, description, sale, price, tags, date } = req.body;
      if (name) product.name = name;
      if (description) product.description = description;
      if (sale) product.sale = sale;
      if (price) product.price = price;
      if (tags) product.tags = tags;
      //if (date) product.date = date;

      const savedProduct = await product.save();

      // If product's price changed, send an email to users who favorited it
      if (price) {
        for (let i = 0; i < product.favs.length; i++) {
          const userfav = product.favs[i];
          const user = await User.findOne({ username: userfav });
          const userEmail = user.email;
          const emailHTML = `<p>Hola ${user.username},</p>
          <p>Te informamos que el artículo "<b>${product.name}</b>" que marcaste como favorito ha experimentado un cambio en su precio.
          Por favor, visita nuestro sitio web para ver los detalles actualizados.</p>
          <p>¡Gracias por tu interés!</p>
          <p>Atentamente,
          Fleapster<p>`;

          sendEmail(
            userEmail,
            "Actualización de precio del artículo favorito",
            emailHTML
          );
        }
      }
      res.json({ result: savedProduct });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EditProductController;
