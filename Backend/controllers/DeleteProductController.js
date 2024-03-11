<<<<<<< HEAD
<<<<<<< HEAD
const Product = require("../models/Product");
const User = require('../models/User');
const ObjectId = require('mongodb').ObjectId;
=======
const { getUserInfo } = require("../lib/authUtils");
const Product = require("../models/Product");
>>>>>>> Backend
=======
const { getUserInfo } = require("../lib/authUtils");
const Product = require("../models/Product");
>>>>>>> 97dde39417cfb4d46827931711fe82e9d43b4cc1

class DeleteProductController {
  async deleteProduct(req, res, next) {
    try {
      const productId = req.params.id;

      // Check user's logged info
<<<<<<< HEAD
<<<<<<< HEAD
      const userId = req.userId;
      const user = await User.findOne({_id: new ObjectId(userId)});
      const username = user.username;

=======
      const { username } = await getUserInfo(req);

      // Search product
>>>>>>> Backend
=======
      const { username } = await getUserInfo(req);

      // Search product
>>>>>>> 97dde39417cfb4d46827931711fe82e9d43b4cc1
      const product = await Product.findById(productId);

      // If products doesnt exist show an error
      if (!product) {
        return res.json({ error: 'Producto no encontrado' });
      }

      // Check products'owner
      if (product.owner !== username) {
        return res.json({ error: 'Permisos no válidos' });
      }

      // If owner is correct delete product
      await Product.findOneAndDelete({ _id: productId });

<<<<<<< HEAD
<<<<<<< HEAD
      res.json({ error: 'Producto eliminado correctamente' });
=======
      res.json({ message: 'Producto eliminado correctamente' });
>>>>>>> Backend
=======
      res.json({ message: 'Producto eliminado correctamente' });
>>>>>>> 97dde39417cfb4d46827931711fe82e9d43b4cc1

    } catch (err) {
      next(err);
    }
  }
}

module.exports = DeleteProductController;
