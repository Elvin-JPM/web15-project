const { getUserInfo } = require("../lib/authUtils");
const Product = require("../models/Product");

class ProductsFavsListController {
  async listFavouriteProducts(req, res) {
    try {
      // Check user's logged info
      const { username } = await getUserInfo(req);
      //const username = req.body.username;
      const usernameURL = req.params.owner;

      //if (username !== usernameURL)
      if (username !== usernameURL) {
        return res.json({ error: "Permisos no válidos" });
      }

      const products = await Product.find({ favs: usernameURL });
      return res.json(products);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = ProductsFavsListController;
