const User = require('../models/User');
const Product = require("../models/Product");
const { getUserInfo } = require("../lib/authUtils");

class UnsucribeUserController {
    async unsuscribe(req, res, next) {
      try {
        // Check user's logged info
        const { username } = await getUserInfo(req);
        const userURL = req.params.username;

        if (username != userURL) {
            return res.json('No tienes permisos para realizar esta acción.');
        }
        
        // Delete user's products and favs
        await User.findOneAndDelete({ username: username});
        await Product.deleteMany({ owner: username});
        await Product.updateMany({ "favs": username }, { $pull: { "favs": username } });

        res.json('Tu cuenta y todos tus productos han sido eliminados correctamente.');
    
      } catch (err) {
          next(err);
      }
    }
  }
  
  module.exports = UnsucribeUserController;
  