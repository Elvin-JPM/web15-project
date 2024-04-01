const Product = require("../models/Product");
const ObjectId = require("mongodb").ObjectId;
const User = require("../models/User");
const Jimp = require("jimp"); // Importar Jimp
const upload = require("../lib/uploadConfigure");
const path = require("path");
const fs = require("fs");

class CreateProductController {
  async createProduct(req, res, next) {
    try {
      // Verificar y crear la carpeta donde se guardarán las imágenes si no existe
      const imagePath = path.resolve(
        __dirname,
        "..",
        "uploads",
        "final_images"
      );
      if (!fs.existsSync(imagePath)) {
        fs.mkdirSync(imagePath, { recursive: true });
      }

      // Upload product's image
      upload.single("photo")(req, res, async function (err) {
        if (err) {
          return next(err);
        }

        const productData = req.body;
        console.log("Product data: ", productData);
        productData.date = new Date();
        productData.reserved = false;
        productData.sold = false;

        const userId = req.userId;
        const user = await User.findOne({ _id: new ObjectId(userId) });
        const username = user.username;

        productData.owner = username;

        const originalName = path.basename(req.file.filename);

        if (req.file) {
          // Resize image with Jimp
          const image = await Jimp.read(req.file.path);
          await image.scaleToFit(300, 200);
          await image.writeAsync(path.join(imagePath, originalName));
        }

        productData.photo = originalName;

        const product = new Product(productData);

        const savedProduct = await product.save();

        res.json({ result: savedProduct });
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CreateProductController;
