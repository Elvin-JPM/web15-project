const Product = require('../models/Product');
const ObjectId = require('mongodb').ObjectId;
const User = require('../models/User');
const upload = require('../lib/uploadConfigure');

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

        if (req.file) {
          productData.photo = req.file.filename;
        }
        
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
