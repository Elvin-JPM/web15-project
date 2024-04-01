var createError = require("http-errors");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.get("Authorization") || req.body.jwt || req.query.jwt;
    if (!jwtToken) {
      next(createError(401, "no token provided"));
      return;
    }

    jwt.verify(jwtToken, "9iup435ntrhjitgeijt", (err, payload) => {
      if (err) {
        next(createError(401, "invalid token"));
        return;
      }
      req.userId = payload._id;
      next();
    });
  } catch (error) {
    next(error);
  }
};
