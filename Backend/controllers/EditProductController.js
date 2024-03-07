const { getUserInfo } = require("../lib/authUtils");
const Product = require("../models/Product");

class EditProductController {
  async editProduct(req, res, next) {
    try {
      const productId = req.params.id;
      const { name, photo, description, sale, price, tags, date } = req.body;
      
      const product = await Product.findById(productId);

       // If products doesnt exist show an error
       if (!product) {
        return res.json({ error: 'Producto no encontrado' });
      }

      // Check user's logged info
      const { username } = await getUserInfo(req);

      if (product.owner !== username) {
        return res.json({ error: 'Permisos no válidos' });
      }

      // If owner is correct update product
      if (name) product.name = name;
      if (photo) product.photo = photo;
      if (description) product.description = description;
      if (sale) product.sale = sale;
      if (price) product.price = price;
      if (tags) product.tags = tags;
      if (date) product.date = date;

      await product.save();
      res.json(product);
      
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EditProductController;