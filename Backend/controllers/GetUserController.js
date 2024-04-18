const User = require("../models/User");

class GetUserController {
  async getUserData(req, res, next) {
    try {
      const username = req.params.username;

      const user = await User.findOne({ username: username });

      // If product doesnt exits shows an error
      if (!user) {
        return res.status(404).json("El usuarion no existe.");
      }

      console.log(user);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = GetUserController;
