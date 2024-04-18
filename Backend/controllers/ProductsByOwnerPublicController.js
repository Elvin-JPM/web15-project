const Product = require("../models/Product");

class ProductsByOwnerPublicController {
  async listProductsPublic(req, res, next) {
    try {
      const user = req.params.owner;
      const products = await Product.find({ owner: user }).sort({ date: -1 });

      res.json(products);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductsByOwnerPublicController;
