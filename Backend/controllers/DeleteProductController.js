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
        return res.json({ error: 'Producto no encontrado' });
      }

      // Check products'owner
      if (product.owner !== username) {
        return res.json({ error: 'Permisos no válidos' });
      }

      // If owner is correct delete product
      await Product.findOneAndDelete({ _id: productId });

      res.json({ message: 'Producto eliminado correctamente' });

    } catch (err) {
      next(err);
    }
  }
}

module.exports = DeleteProductController;
