<<<<<<< HEAD
<<<<<<< HEAD
=======
const { getUserInfo } = require("../lib/authUtils");
>>>>>>> Backend
=======
const { getUserInfo } = require("../lib/authUtils");
>>>>>>> 97dde39417cfb4d46827931711fe82e9d43b4cc1
const Product = require("../models/Product");

class ProductListController {
  async listProducts(req, res, next) {
    try {
<<<<<<< HEAD
<<<<<<< HEAD
      const username = req.params.owner;
      const products = await Product.find({ owner: username });
=======

      // Check user's logged info and permissions
      const { username } = await getUserInfo(req);
      const usernameURL = req.params.owner;
      const products = await Product.find({ owner: username });
=======

      // Check user's logged info and permissions
      const { username } = await getUserInfo(req);
      const usernameURL = req.params.owner;
      const products = await Product.find({ owner: username });
      console.log(username, products.owner)
>>>>>>> 97dde39417cfb4d46827931711fe82e9d43b4cc1

      if (usernameURL !== username) {
        return res.json({ error: 'Permisos no válidos' });
      }
<<<<<<< HEAD
>>>>>>> Backend
=======
>>>>>>> 97dde39417cfb4d46827931711fe82e9d43b4cc1
      res.json(products);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductListController;
