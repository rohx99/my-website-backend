const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const logger = require("../utils/logger");
const axios = require("axios");

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  let ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "")
    .split(",")[0]
    .trim();
  if (ip === "::1") ip = "127.0.0.1";

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials, please try again !",
        error: "User not found",
      });
    }

    if (user.password && (await bcrypt.compare(password, user.password))) {
      const userDetails = {
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        email: user.email,
        profilePicture: user.profilePicture,
        gender: user.gender,
        dob: user.dob,
      };

      const userName = `${user.firstName} ${user.lastName}`;

      const token = generateToken(user._id, userName);

      logger(
        "User Login",
        `${userName} has logged in successfully into console.`,
        null,
        null,
        ip
      );
      return res
        .cookie("token", token)
        .status(200)
        .json({
          success: true,
          message: `Welcome ${user.firstName} !`,
          userDetails,
          token,
        });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid credentails, please try again",
        error: "Password mismatch",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to login",
      error: error.message,
    });
  }
};

module.exports = { userLogin };
