<<<<<<< HEAD
const jwt = require("jsonwebtoken");
const User = require("../models/User");

class LoginController {
  async postJWT(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username: username });

      // If user doesn't exist, show an error
      if (!user || !(await user.comparePassword(password))) {
        res.status(401).json({ error: "Credenciales incorrectas" });
        return;
      }

      // Check if user is active
      if (!user.active) {
        res.status(403).json({ error: "Usuario inactivo" });
        return;
      }

      // If user exists and is active, give a JWT token
      const tokenJWT = await jwt.sign(
        { _id: user._id },
        "9iup435ntrhjitgeijt",
        {
          expiresIn: "24h",
        }
      );
      res.json({ jwt: tokenJWT, username: user.username });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = LoginController;
=======
const jwt = require("jsonwebtoken");
const User = require("../models/User");

class LoginController {
  async postJWT(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username: username });

      // If user doesn't exist, show an error
      if (!user || !(await user.comparePassword(password))) {
        res.status(401).json({ error: "Credenciales incorrectas" });
        return;
      }

      // Check if user is active
      if (!user.active) {
        res.status(403).json({ error: "Usuario inactivo" });
        return;
      }

      // If user exists and is active, give a JWT token
      const tokenJWT = await jwt.sign(
        { _id: user._id },
        "9iup435ntrhjitgeijt",
        {
          expiresIn: "24h",
        }
      );
      res.json({ jwt: tokenJWT, username: user.username });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = LoginController;
>>>>>>> 5d1f2bc9574fb5efac5b8918a417fbfbe4d99d08
