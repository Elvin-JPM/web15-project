const { getUserInfo } = require("../lib/authUtils");
const Product = require("../models/Product");

class ProductListController {
  async listProducts(req, res, next) {
    try {

      // Check user's logged info and permissions
      const { username } = await getUserInfo(req);
      const usernameURL = req.params.owner;
      const products = await Product.find({ owner: username });

      if (usernameURL !== username) {
        return res.json({ error: 'Permisos no válidos' });
      }
      res.json(products);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductListController;
