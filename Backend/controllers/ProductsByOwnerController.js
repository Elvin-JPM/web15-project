const Product = require("../models/Product");

class ProductListController {
  async listProducts(req, res, next) {
    try {
      const username = req.params.owner;
      const products = await Product.find({ owner: username });
      res.json(products);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductListController;
