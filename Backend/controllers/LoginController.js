const jwt = require('jsonwebtoken');
const User = require('../models/User');

class LoginController {
  
  async postJWT(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });

      // If user doesnt exit shows an error
      if (!user || !(await user.comparePassword(password)) ) {
        res.json({ error: 'Invalid credentials' });
        return;
      }

      // If user exists gives an JWTtoken
      const tokenJWT = await jwt.sign({ _id: user._id }, '9iup435ntrhjitgeijt', {
        expiresIn: '24h'
      });
      res.json({ jwt: tokenJWT });

    } catch (err) {
      next(err);
    }
  }
}

module.exports = LoginController;