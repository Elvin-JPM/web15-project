const Product = require("../models/Product");

class ProductListController {
  async listProducts(req, res, next) {
    try {
      const filterByName = req.query.name;
      const filterByTags = req.query.tags;
      const filterMinPrice = req.query.minPrice;
      const filterMaxPrice = req.query.maxPrice;

<<<<<<< HEAD
<<<<<<< HEAD
      console.log("NAME:", req.query.name);

=======
>>>>>>> Backend
=======
>>>>>>> 97dde39417cfb4d46827931711fe82e9d43b4cc1
      const filter = {};

      if (filterByName) {
        filter.name = new RegExp("^" + filterByName, "i"); // not case sensitive
      }

      if (filterByTags) filter.tags = { $in: req.query.tags.split(",") }; // Assuming tags is an array

      if (filterMinPrice && filterMaxPrice) {
        query.price = { $gte: filterMinPrice, $lte: filterMaxPrice };
      } else if (filterMinPrice) {
        query.price = { $gte: filterMinPrice };
      } else if (filterMaxPrice) {
        query.price = { $lte: filterMaxPrice };
      }

      const products = await Product.filters(filter);
      res.json({ results: products.length, data: products });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductListController;
