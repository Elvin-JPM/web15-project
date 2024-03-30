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

      // Verificar si el usuario actual tiene permiso para realizar la acción
      if (username !== userURL) {
        return res
          .status(403)
          .json({ error: "No tienes permisos para realizar esta acción." });
      }

      // Validar datos de entrada (correo electrónico y nombre de usuario)
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

      // Encriptar nueva contraseña si se proporciona
      if (newData.password) {
        const hashedPassword = await bcrypt.hash(newData.password, 7);
        newData.password = hashedPassword;
      }

      // Actualizar información del usuario
      const updatedUser = await User.findOneAndUpdate({ username }, newData, {
        new: true,
      });

      // Si el usuario actualizó su nombre de usuario, actualizar productos y favoritos
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
