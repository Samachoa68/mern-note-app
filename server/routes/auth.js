require("dotenv").config();
const express = require("express");
const User = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");

const router = express.Router();

//  @Route GET /api/auth
//  @desc Check if user logged in
//  @access Public
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error internal server" });
  }
});

//  @Route Post /api/auth/register
//  @desc Register user
//  @access Public
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing usernmae or password" });

  try {
    //Check exist
    const user = await User.findOne({ username });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Username already taken" });

    const hashedPassword = await argon2.hash(password);

    //All good
    const newUser = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save();

    //Get token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error internal server" });
  }
});

//  @Route Post /api/auth/login
//  @desc Login user
//  @access Public
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing usernmae or password" });

  try {
    const user = await User.findOne({ username });
    //Incorrect usernmae
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });

    //Compare pass
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });

    //All good
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      success: true,
      message: "Login successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error internal server" });
  }
});

module.exports = router;
