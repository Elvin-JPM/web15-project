const Product = require('../models/Product');

class CreateProductController {
  async createProduct(req, res, next) {
    try {
        const productData = req.body;
        const product = new Product(productData);
        const savedProduct = await product.save();
  
        res.json({ result: savedProduct });
  
    } catch (err) {
        next(err);
    }
  }
}

module.exports = CreateProductController;
