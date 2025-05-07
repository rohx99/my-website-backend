const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  const { firstName, middleName, lastName, email, password, gender, dob } =
    req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with same email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      middleName,
      lastName,
      email,
      password: hashedPassword,
      gender,
      dob,
    });

    if (req.file) {
      newUser.profilePicture = req.file.path;
      await newUser.save();
    }

    return res.status(201).json({
      success: true,
      message: "New user created successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create a new user",
      error: error.message,
    });
  }
};

module.exports = { createUser };
