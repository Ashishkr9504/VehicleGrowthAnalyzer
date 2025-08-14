const userModel = require("../../models/User");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      throw new Error("Please provide all required fields");
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists.");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      error: false,
      message: "User created successfully!",
      data: savedUser,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: true,
      message: err.message || "Something went wrong.",
    });
  }
};

module.exports = signup;