const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../lib/sendEmailUtils');

class ResetUserController {
    async sendResetEmail(req, res, next) {
        try {
            const { userEmail } = req.body;
            const user = await User.findOne({ email: userEmail });

            if (!user) {
                return res.json({ error: 'Usuario no encontrado' });
            }

            // User's new token for reset password
            const token = jwt.sign({ userId: user._id }, '9iup435ntrhjitgeijt', { expiresIn: '10m' });
            user.resetPasswordToken = token;
            await user.save();

            const verificationLink = `http://localhost:3000/api/reset-password/${token}`;

            // HTML content for email
            const emailHTML = `<p name="token" >${token}</p>`;

            sendEmail(userEmail,'Restablecer contraseña de usuario en Fleapster',emailHTML);
            res.json('ok')

        } catch (err) {
            next(err);
        }
    }

    async resetPassword(req, res, next) {
        try {
            const { newPassword } = req.body;
            const resetToken = req.headers.resettoken;

            if ( !(resetToken && newPassword) ) {
                return res.json('Todos los campos son requeridos');
            }

            const newPasswordHashed = await bcrypt.hash(newPassword, 7);
            const userToReset =  await User.findOne( { resetPasswordToken: resetToken });

            if ( !userToReset ){
                return res.json('Algo salió mal');
            }

            userToReset.password = newPasswordHashed;
            userToReset.resetPasswordToken = '';
            await userToReset.save();
            res.status(200).json('Contraseña reseteada');

        } catch (err) {
            next(err);
        }
    }
}

module.exports = ResetUserController;


