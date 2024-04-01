const { getUserInfo } = require("../lib/authUtils");
const Product = require("../models/Product");

class DeleteProductController {
  async deleteProduct(req, res, next) {
    try {
      const productId = req.params.id;

      // Check user's logged info
      const { username } = await getUserInfo(req);

      // Search product
      const product = await Product.findById(productId);

      // If products doesnt exist show an error
      if (!product) {
        return res.json('Producto no encontrado');
      }

      // Check products'owner
      if (product.owner !== username) {
        return res.json('Permisos no válidos');
      }

      // If owner is correct delete product
      await Product.findOneAndDelete({ _id: productId });

      res.json('Producto eliminado correctamente');

    } catch (err) {
      next(err);
    }
  }
}

module.exports = DeleteProductController;
