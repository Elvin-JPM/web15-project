const Product = require("../models/Product");

class ProductListController {
  async listProducts(req, res, next) {
    try {
      const filterByName = req.query.name;
      const filterBySale = req.query.sale;
      const filterByTags = req.query.tags;
      const filterMinPrice = req.query.minPrice;
      const filterMaxPrice = req.query.maxPrice;

      // Pagination
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit) : 4;
      const skip = (page - 1) * limit;

      const filter = {};

      if (filterByName) {
        filter.name = new RegExp("^" + filterByName, "i"); // not case sensitive
      }

      if (filterBySale) {
        filter.sale = filterBySale;
      }

      if (filterByTags) {
        filter.tags = { $in: filterByTags.split(",") }; // Assuming tags is an array
      }

      if (filterMinPrice && filterMaxPrice) {
        filter.price = { $gte: filterMinPrice, $lte: filterMaxPrice };
      } else if (filterMinPrice) {
        filter.price = { $gte: filterMinPrice };
      } else if (filterMaxPrice) {
        filter.price = { $lte: filterMaxPrice };
      }
      const numFound = await Product.find(filter);
      const products = await Product.filters(filter, skip, limit);
      res.json({
        numFound: numFound.length,
        numReturned: products.length,
        data: products,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductListController;
