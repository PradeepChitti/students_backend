const asyncHandler = require("express-async-handler");
const JWT = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(400);
        throw new Error("user is not authorized !");
      }
      console.log("Decoded user====", decoded);
      req.user = decoded.user;
      next();
    });
    if (!token) {
      res.status(400);
      throw new Error("token is missing !");
    }
  }
});

module.exports = validateToken;
