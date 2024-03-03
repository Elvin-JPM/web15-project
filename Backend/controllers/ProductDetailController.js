const Product = require('../models/Product');

class ProductDetailController {
  async getProductDetail(req, res, next) {
      try {
        const productId = req.params.id;
        const productName = req.params.name;
        const product = await Product.findById(productId);

        // If product doesnt exits shows an error
        if (!product) {
          return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Replace hyphens from the product name for ' ' 
        const productNameWithoutHyphens = productName.replace(/-/g, ' ');
        console.log(productNameWithoutHyphens)

        // Check if name is correct
        if (product.name !== productNameWithoutHyphens) {
          return res.status(400).json({ error: 'El nombre del producto no coincide' });
        }

        res.json(product);    

      } catch (err) {
          next(err);
      }
  }
}

module.exports = ProductDetailController;