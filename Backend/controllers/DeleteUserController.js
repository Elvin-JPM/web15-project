const { getUserInfo } = require("../lib/authUtils");
const User = require("../models/User");
const Product = require("../models/Product");

class DeleteUserController {
  async deleteUser(req, res, next) {
    try {
      console.log("inside the delete user controller");
      const usernameUrl = req.params.username;

      // Check user's logged info
      const { username } = await getUserInfo(req);

      // Search user
      const user = await User.findOne({ username });

      // If user doesnt exist show an error
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Check users
      if (usernameUrl !== username) {
        return res.status(403).json({ message: "Permisos no válidos" });
      }

      // Delete user
      await User.findOneAndDelete({ username });

      // Delete products owned by the user
      await Product.deleteMany({ owner: username });

      // Remove the user from the favs array of all products
      await Product.updateMany(
        { favs: username },
        { $pull: { favs: username } }
      );

      res.json({ ok: true, message: "Usuario eliminado correctamente" });
    } catch (err) {
      console.error("Error deleting user:", err);
      next(err);
    }
  }
}

module.exports = DeleteUserController;
