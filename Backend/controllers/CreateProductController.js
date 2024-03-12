const Product = require('../models/Product');
const ObjectId = require('mongodb').ObjectId;
const User = require('../models/User');
const Jimp = require('jimp'); // Importar Jimp
const upload = require('../lib/uploadConfigure');
const path = require('path');

class CreateProductController {
  async createProduct(req, res, next) {
    try {
      // Upload product's image
      upload.single('photo')(req, res, async function(err) {
        if (err) {
          return next(err);
        }

        const productData = req.body;
        productData.date = new Date();

        const userId = req.userId;
        const user = await User.findOne({_id: new ObjectId(userId)});
        const username = user.username;

        productData.owner = username;

        const originalName = path.basename(req.file.filename);

        if (req.file) {
          // Resize image with Jimp
          const image = await Jimp.read(req.file.path);
          
          // Redimensionar la imagen manteniendo la proporción original
          await image.scaleToFit(300, 200);

          await image.writeAsync(`../Backend/uploads/final_images/${originalName}`); // Guardar la imagen redimensionada con el mismo nombre
        }

        productData.photo = originalName; // Asignar el nombre de la imagen redimensionada
        
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
