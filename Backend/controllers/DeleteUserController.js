const { getUserInfo } = require("../lib/authUtils");
const User = require("../models/User");

class DeleteUserController {
  async deleteUser(req, res, next) {
    try {
      console.log("inside the delete user controller");
      const userNameUrl = req.params.username;

      // Check user's logged info
      const { username } = await getUserInfo(req);

      // Search user
      const user = await User.findOne({ username: username });

      // If user doesnt exist show an error
      if (!user) {
        return res.status(400).json("Usuario no encontrado");
      }

      // Check users
      if (userNameUrl !== username) {
        return res.json("Permisos no válidos");
      }

      // If user is correct delete product
      await User.findOneAndDelete({ username: username });

      res.json({ ok: true, message: "Usuario eliminado correctamente" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = DeleteUserController;
