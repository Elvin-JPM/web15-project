const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');

// GET: List all products
// http://127.0.0.1:3000/api/products

router.get('/', async (req,res, next) => {
    try {
        const products = await Product.find();
        res.json({ results: products });
    } catch(err) {
        next(err);
    }
});

// POST: Create a new product

router.post('/', async (req, res, next) => {
    try {
        const productData = req.body;
        const product = new Product(productData);
        const savedProduct = await product.save();
  
        res.json({ result: savedProduct });
  
    } catch (err) {
        next(err);
    }
  });
  
module.exports = router;