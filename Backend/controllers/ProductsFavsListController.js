const { getUserInfo } = require("../lib/authUtils");
const Product = require("../models/Product");

class ProductsFavsListController {
  async listFavouriteProducts(req, res) {
    try {
      const { username } = await getUserInfo(req);
      const usernameURL = req.params.owner;

      if (username !== usernameURL) {
        return res.json("Permisos no válidos");
      }

      const products = await Product.find({ favs: usernameURL });
      return res.json(products);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json("Internal Server Error");
    }
  }
}

module.exports = ProductsFavsListController;
