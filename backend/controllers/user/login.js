const bcrypt = require("bcryptjs");
const userModel = require("../../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please provide both email and password");
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found. Please register.");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("Incorrect password");
    }

    const tokenPayload = { _id: user._id, email: user.email };
    const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE || "10d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
    });

    res.status(200).json({
      success: true,
      error: false,
      message: "Login successfully",
      token,
      userId: user._id,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      error: true,
      message: err.message || "Something went wrong.",
    });
  }
};

module.exports = login;