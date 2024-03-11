const User = require('../models/User');
const Product = require("../models/Product");
const { getUserInfo } = require("../lib/authUtils");

class UnsucribeUserController {
    async unsuscribe(req, res, next) {
      try {
        // Check user's logged info and permissions
        const { username } = await getUserInfo(req);
        const userURL = req.params.username;
        console.log(username,userURL)

        if (username != userURL) {
            return res.json({ error: 'No tienes permisos para realizar esta acción.' });
        }
        
        await User.findOneAndDelete({ username: username});
        await Product.deleteMany({ owner: username});

        res.json({ message: 'Tu cuenta y todos tus productos han sido eliminados correctamente.' });
    
      } catch (err) {
          next(err);
      }
    }
  }
  
  module.exports = UnsucribeUserController;
  