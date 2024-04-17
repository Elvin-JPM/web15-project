const User = require("../models/User");
const Product = require("../models/Product");
const { getUserInfo } = require("../lib/authUtils");
const bcrypt = require("bcrypt");

class UpdateUserController {
  async updateUserInfo(req, res, next) {
    try {
      const { username } = await getUserInfo(req);
      const userURL = req.params.username;
      const newData = req.body;
      console.log(newData)

      // Check if the current user has permission to perform the action
      if (username !== userURL) {
        return res
          .status(403)
          .json({ error: "No tienes permisos para realizar esta acción." });
      }

      // Validate input data (email and username)
      if (newData.email || newData.username) {
        const existingEmail = await User.findOne({ email: newData.email });
        const existingUsername = await User.findOne({
          username: newData.username,
        });
        if (existingEmail && existingEmail.username !== username) {
          return res
            .status(400)
            .json({ error: "El correo electrónico ya está en uso." });
        }
        if (existingUsername && existingUsername.username !== username) {
          return res
            .status(400)
            .json({ error: "El nombre de usuario ya está en uso." });
        }
      }

      // Encrypt new password if provided
      if (newData.password) {
        const hashedPassword = await bcrypt.hash(newData.password, 7);
        newData.password = hashedPassword;
      }

      // Update user information
      const updatedUser = await User.findOneAndUpdate({ username }, newData, {
        new: true,
      });

      // If the user updated their username, update products and favorites
      if (newData.username) {
        await Product.updateMany(
          { owner: username },
          { owner: newData.username }
        );
        await Product.updateMany(
          { favs: username },
          { $set: { "favs.$": newData.username } }
        );
      }

      res.json({
        ok: true,
        message:
          "La información del usuario ha sido actualizada correctamente.",
        user: updatedUser,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UpdateUserController;
