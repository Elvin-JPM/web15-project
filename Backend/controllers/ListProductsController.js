<<<<<<< HEAD
// const Product = require("../models/Product");

// class ProductListController {
//   async listProducts(req, res, next) {
//     try {
//       const filterByName = req.query.name;
//       const filterByTags = req.query.tags;
//       const filterMinPrice = req.query.minPrice;
//       const filterMaxPrice = req.query.maxPrice;

//       //Pagination
//       const page = req.query.page;
//       let limit = req.query.limit * 1;
//       let skip = req.query.skip;

//       const filter = {};

//       if (page) {
//         limit = 5;
//         skip = (page * 1 - 1) * limit;
//       } else {
//         skip = 0;
//       }

//       if (filterByName) {
//         filter.name = new RegExp("^" + filterByName, "i"); // not case sensitive
//       }

//       if (filterByTags) filter.tags = { $in: req.query.tags.split(",") }; // Assuming tags is an array

//       if (filterMinPrice && filterMaxPrice) {
//         query.price = { $gte: filterMinPrice, $lte: filterMaxPrice };
//       } else if (filterMinPrice) {
//         query.price = { $gte: filterMinPrice };
//       } else if (filterMaxPrice) {
//         query.price = { $lte: filterMaxPrice };
//       }

//       const products = await Product.filters(filter, skip, limit);
//       res.json({ results: products.length, data: products });
//     } catch (err) {
//       next(err);
//     }
//   }
// }

// module.exports = ProductListController;

const Product = require("../models/Product");

class ProductListController {
  async listProducts(req, res, next) {
    try {
      const filterByName = req.query.name;
      const filterByTags = req.query.tags;
      const filterMinPrice = req.query.minPrice;
      const filterMaxPrice = req.query.maxPrice;

      // Pagination
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit) : 16;
      const skip = (page - 1) * limit;

      const filter = {};

      if (filterByName) {
        filter.name = new RegExp("^" + filterByName, "i"); // not case sensitive
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
=======
// const Product = require("../models/Product");

// class ProductListController {
//   async listProducts(req, res, next) {
//     try {
//       const filterByName = req.query.name;
//       const filterByTags = req.query.tags;
//       const filterMinPrice = req.query.minPrice;
//       const filterMaxPrice = req.query.maxPrice;

//       //Pagination
//       const page = req.query.page;
//       let limit = req.query.limit * 1;
//       let skip = req.query.skip;

//       const filter = {};

//       if (page) {
//         limit = 5;
//         skip = (page * 1 - 1) * limit;
//       } else {
//         skip = 0;
//       }

//       if (filterByName) {
//         filter.name = new RegExp("^" + filterByName, "i"); // not case sensitive
//       }

//       if (filterByTags) filter.tags = { $in: req.query.tags.split(",") }; // Assuming tags is an array

//       if (filterMinPrice && filterMaxPrice) {
//         query.price = { $gte: filterMinPrice, $lte: filterMaxPrice };
//       } else if (filterMinPrice) {
//         query.price = { $gte: filterMinPrice };
//       } else if (filterMaxPrice) {
//         query.price = { $lte: filterMaxPrice };
//       }

//       const products = await Product.filters(filter, skip, limit);
//       res.json({ results: products.length, data: products });
//     } catch (err) {
//       next(err);
//     }
//   }
// }

// module.exports = ProductListController;

const Product = require("../models/Product");

class ProductListController {
  async listProducts(req, res, next) {
    try {
      const filterByName = req.query.name;
      const filterByTags = req.query.tags;
      const filterMinPrice = req.query.minPrice;
      const filterMaxPrice = req.query.maxPrice;

      // Pagination
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit) : 16;
      const skip = (page - 1) * limit;

      const filter = {};

      if (filterByName) {
        filter.name = new RegExp("^" + filterByName, "i"); // not case sensitive
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
>>>>>>> 5d1f2bc9574fb5efac5b8918a417fbfbe4d99d08
