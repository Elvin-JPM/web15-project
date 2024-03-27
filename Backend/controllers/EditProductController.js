const { getUserInfo } = require("../lib/authUtils");
const sendEmail = require('../lib/sendEmailUtils');
const User = require('../models/User');
const Product = require("../models/Product");
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Configurar multer para manejar la carga de archivos
const upload = multer({ dest: 'uploads/' }); // Establece el directorio de destino para guardar los archivos

class EditProductController {
  async editProduct(req, res, next) {
    try {
      const productId = req.params.id;
      
      const product = await Product.findById(productId);

      // Verificar si se encontró el producto
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      // Obtener la información del usuario
      const { username } = await getUserInfo(req);

      // Verificar permisos del usuario
      if (product.owner !== username) {
        return res.status(403).json({ error: 'Permisos no válidos' });
      }

      // Actualizar los campos del producto
      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.sale = req.body.sale || product.sale;
      product.price = req.body.price || product.price;
      product.tags = req.body.tags || product.tags;

      // Manejar la carga de la nueva foto, si se proporciona
      if (req.file) {
        // Eliminar la foto anterior si existe
        if (product.photo) {
          fs.unlinkSync(path.join(__dirname, '..', product.photo));
        }
        
        // Guardar la nueva foto y actualizar la ruta en el producto
        const newPhotoPath = `uploads/final_images/${productId}_${Date.now()}${path.extname(req.file.originalname)}`;
        fs.renameSync(req.file.path, path.join(__dirname, '..', newPhotoPath));
        product.photo = newPhotoPath;
      }

      // Guardar los cambios en el producto
      await product.save();

      // Enviar la respuesta
      res.json(product);
      
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EditProductController;
