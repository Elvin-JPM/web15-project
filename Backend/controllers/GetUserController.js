const User = require("../models/User");

class GetUserController {
  async getUserData(req, res, next) {
    try {
      const username = req.params.username;

      const user = await User.findOne({ username: username });

      // If product doesnt exits shows an error
      if (!user) {
        return res.status(404).json("El usuarion no existe.");
      }

      // Replace hyphens from the product name for ' '
      //const productNameWithoutHyphens = productName.replace(/-/g, " ");

      // Check if name is correct
      //   if (product.name !== productNameWithoutHyphens) {
      //     return res.status(404).json("Producto no encontrado");
      //   }

      console.log(user);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = GetUserController;
