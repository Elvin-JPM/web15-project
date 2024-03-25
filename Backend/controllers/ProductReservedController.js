const { getUserInfo } = require("../lib/authUtils");
const Product = require("../models/Product");

class ProductReservedController {
  async checkReservedProduct(req, res) {
    const productId = req.params.id;
    console.log(productId)

    // Check user's logged info
    const { username } = await getUserInfo(req);
    console.log(product)
    try {
      const product = await Product.findById(productId);
      console.log(product)

      /*if (!username) {
        return res.json("No tienes los permisos necesarios" );
      }

      if (!product) {
        return res.status(404).json("Producto no encontrado" );
      }

      product.reserved = true;
      await product.save();
      res.json(product);*/
    } catch (error) {
      res
        .status(500)
        .json("Error al marcar el producto como favorito");
    }
  }

  async uncheckReservedProduct(req, res) {
    const productId = req.params.id;

    // Check user's logged info
    const { username } = await getUserInfo(req);

    try {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      product.reserved = false;
      await product.save();

      res.json(product);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Error al desmarcar el producto como favorito" });
    }
  }
}

module.exports = ProductReservedController;