const { getUserInfo } = require("../lib/authUtils");
const Product = require("../models/Product");

class ProductReservedController {
  async checkReservedProduct(req, res) {
    const productId = req.params.id
    console.log(productId)
  
    try {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json("Producto no encontrado" );
      }

       // Check user's logged info
      const { username } = await getUserInfo(req);
      console.log(username,product.owner)
      if (product.owner !== username) {
         return res.status(401).json('Permisos no válidos');
      }
      
      await Product.findOneAndUpdate({ _id: productId }, { reserved: true });
      res.json(product);

    } catch (error) {
      res
        .status(500)
        .json("Error al marcar el producto como reservado");
    }
  }

  async uncheckReservedProduct(req, res) {
    const productId = req.params.id;

    try {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

       // Check user's logged info
       /*const { username } = await getUserInfo(req);

       if (product.owner !== username) {
         return res.json('Permisos no válidos');
       }*/

      product.reserved = false;
      await product.save();

      res.json(product);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Error al desmarcar el producto como reservado" });
    }
  }
}

module.exports = ProductReservedController;