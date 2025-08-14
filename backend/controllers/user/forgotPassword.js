const userModel = require("../../models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) throw new Error("Email is required.");

    const user = await userModel.findOne({ email });
    if (!user) throw new Error("User not found.");

    
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = Date.now() + 3600000; // 1 hour

    user.resetPasswordToken = token;
    user.resetPasswordExpires = expiry;
    await user.save();

    // SMTP setup
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const resetLink = `http://localhost:3000/reset-password/${token}`;
    const mailOptions = {
      from: `"Financially Free" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Password Reset",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 1 hour.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Reset link sent to your email.",
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message || "Something went wrong.",
    });
  }
};

module.exports = forgotPassword;
