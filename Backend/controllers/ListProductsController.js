const Product = require('../models/Product');

class ProductListController {
  async listProducts(req, res, next) {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductListController;
