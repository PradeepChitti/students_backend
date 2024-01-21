const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const User = require("../models/userModel");

// new user registration --> POST
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const isUserAvailable = await User.findOne({ email });
  if (isUserAvailable) {
    res.status(400);
    throw new Error("User already registered !");
  }
  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password===", hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (user) {
    res
      .status(201)
      .json({ message: "User Registered", _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("Something went wrong unable to create user");
  }
});

// Logging In registered user --> POST
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email });
  // compare password with hashed password and if matches provide token
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = JWT.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid !!");
  }
});

// @access PRIVATE
const currentUser = (req, res) => {
  const user = req.user;
  res.status(200).json({ user });
};

module.exports = { registerUser, loginUser, currentUser };
