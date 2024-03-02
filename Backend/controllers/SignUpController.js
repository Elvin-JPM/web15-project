const bcrypt = require('bcrypt');
const User = require('../models/User');

class SignUpController {
    async signUpUser(req, res, next) {
        try {
            const { username, email, password } = req.body;

            // If user exits shows an error
            const existingEmail = await User.findOne({ email });
            const existingUsername = await User.findOne({ username });
            if (existingEmail || existingUsername ) {
                return res.status(400).json({ error: 'User already exists' });
            }

            // If user doesnt exit create it
            const hashedPassword = await bcrypt.hash(password, 7);
            const newUser = new User({ username, email, password: hashedPassword });
            await newUser.save();
            
            res.json({ user: newUser });

            res.end();

        } catch (err) {
            next(err);
        }
    }
}

module.exports = SignUpController;

