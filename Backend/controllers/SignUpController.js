const bcrypt = require('bcrypt');
const User = require('../models/User');

class SignUpController {
    async signUpUser(req, res, next) {
        try {
            const { username, email, password, active} = req.body;

            // If user exits shows an error
            const existingEmail = await User.findOne({ email });
            const existingUsername = await User.findOne({ username });
            if (existingEmail || existingUsername ) {
                return res.json({ error: 'El usuario ya está dado de alta' });
            }

            // If user doesnt exit create it
            const hashedPassword = await bcrypt.hash(password, 7);
            const newUser = new User({ username, email, password: hashedPassword, active: true, resetPasswordToken: ""});
            await newUser.save();
            
            res.json({ user: newUser });

            res.end();

        } catch (err) {
            next(err);
        }
    }
}

module.exports = SignUpController;

