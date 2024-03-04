const Product = require('../models/Product');
const ObjectId = require('mongodb').ObjectId;
const User = require('../models/User');

class CreateProductController {
  async createProduct(req, res, next) {
    try {
        const productData = req.body;
        productData.date = new Date();
        
        const userId = req.userId;
        const user = await User.findOne({_id: new ObjectId(userId)});
        console.log(user)
        const username = user.username;
        productData.owner = username;
        
        const product = new Product(productData);
        const savedProduct = await product.save();
  
        res.json({ result: savedProduct });
  
    } catch (err) {
        next(err);
    }
  }
}

module.exports = CreateProductController;
