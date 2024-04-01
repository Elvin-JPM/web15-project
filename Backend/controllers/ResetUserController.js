const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../lib/sendEmailUtils");

class ResetUserController {
  async sendResetEmail(req, res, next) {
    try {
      const { userEmail } = req.body;
      const user = await User.findOne({ email: userEmail });

      if (!user) {
        return res.json({ error: "Usuario no encontrado" });
      }

      // User's new token for reset password
      const token = jwt.sign({ userId: user._id }, "9iup435ntrhjitgeijt", {
        expiresIn: "10m",
      });
      user.resetPasswordToken = token;
      await user.save();

      const verificationLink = `http://localhost:5173/reset-password/${token}`;

      // HTML content for email
      const emailHTML = `<p>Hola ${user.username},</p>
            <p>Recibes este correo electrónico porque hemos recibido una solicitud para restablecer la contraseña de tu cuenta en Fleapster.</p>
            <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:
            <a>${verificationLink}</a></p>
            <p>Si no has solicitado este cambio, puedes ignorar este correo electrónico de manera segura. Tu contraseña seguirá siendo la misma.</p>
            <p>Gracias</p>
            <p>Atentamente,
            Fleapster<p>`;

      sendEmail(userEmail, "Restablecimiento de contraseña", emailHTML);
      res.json("Email enviado correctamente");
    } catch (err) {
      next(err);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { newPassword } = req.body;
      const resetToken = req.headers.headers;

      if (!(resetToken && newPassword)) {
        return res.json("Todos los campos son requeridos");
      }

      const newPasswordHashed = await bcrypt.hash(newPassword, 7);
      const userToReset = await User.findOne({
        resetPasswordToken: resetToken,
      });

      if (!userToReset) {
        return res.json("Algo salió mal");
      }

      userToReset.password = newPasswordHashed;
      userToReset.resetPasswordToken = "";
      await userToReset.save();
      res
        .status(200)
        .json({ message: "Contraseña reseteada", statusText: "ok" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ResetUserController;
