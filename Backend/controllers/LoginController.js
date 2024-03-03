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

      // Check if user its active
      if (user.active === false){
        res.json({ error: 'User inactive' });
        return;
      }

      // If user exists and its active gives an JWTtoken
      const tokenJWT = await jwt.sign({ _id: user._id }, '9iup435ntrhjitgeijt', {
        expiresIn: '24h'
      });
      res.json({ jwt: tokenJWT });

    } catch (err) {
      next(err);
    }
  }
};

module.exports = LoginController;