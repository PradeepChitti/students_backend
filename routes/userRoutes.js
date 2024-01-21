const express = require("express");

const validateToken = require("../middleware/validateTokenHandler");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controller/userController");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// current user information
// @access PRIVATE
userRouter.get("/current", validateToken, currentUser);

module.exports = userRouter;
