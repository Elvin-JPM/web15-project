const Product = require("../models/Product");
const User = require('../models/User');
const { getUserInfo } = require("../lib/authUtils");

class ProductListControllerAuth {
  async listProductsAuth(req, res, next) {
    try {
        const userInfo = await getUserInfo(req);

        const userId = userInfo.userId;

     const user = await User.findById(userId);

    if (!user) {
        return res.json({ error: 'Usuario no encontrado' });
    }
    
    const products = await Product.find({ owner: userId });

    res.json(products);
    
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductListControllerAuth;
