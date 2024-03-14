const { getUserInfo } = require("../lib/authUtils");
const Product = require("../models/Product");

class ProductsFavsController {
    async checkFavouriteProduct(req, res) {
      const productId = req.params.id;
      
      // Check user's logged info
      const { username } = await getUserInfo(req);
  
      try {
        const product = await Product.findById(productId);

        if( !username ){
            return res.json({ error: 'No tienes los permisos necesarios' });
        }

        if (!product) {
          return res.status(404).json({ error: 'Producto no encontrado' });
        }
  
        if (!product.favs.includes(username)) {
          product.favs.push(username);
          await product.save();
        }
        res.json(product);
        
      } catch (error) {
        res.status(500).json({ error: 'Error al marcar el producto como favorito' });
      }
    }
  
    async uncheckFavouriteProduct(req, res) {
      const productId = req.params.id;
      
      // Check user's logged info
      const { username } = await getUserInfo(req);
  
      try {
        const product = await Product.findById(productId);
  
        if (!product) {
          return res.status(404).json({ error: 'Producto no encontrado' });
        }
  
        const index = product.favs.indexOf(username);
        if (index !== -1) {
          product.favs.splice(index, 1);
          await product.save();
        }
  
        res.json(product);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al desmarcar el producto como favorito' });
      }
    }
}
    

module.exports = ProductsFavsController;
  