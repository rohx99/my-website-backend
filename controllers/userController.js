const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const unlinkAsync = require("../utils/unlinkAsync");
const path = require("path");
const logger = require("../utils/logger");

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

const updateUser = async (req, res) => {
  const { firstName, middleName, lastName, email, password, gender, dob } =
    req.body;
  const loggedInUser = req.user;

  try {
    const user = await User.findById(loggedInUser.userId);

    const previousData = {};
    const updatedData = {};
    let isUpdated = false;

    if (firstName && user.firstName !== firstName) {
      previousData.firstName = user.firstName;
      updatedData.firstName = firstName;
      isUpdated = true;
    }

    if (middleName && user.middleName !== middleName) {
      previousData.middleName = user.middleName;
      updatedData.middleName = middleName;
      isUpdated = true;
    }

    if (lastName && user.lastName !== lastName) {
      previousData.lastName = user.lastName;
      updatedData.lastName = lastName;
      isUpdated = true;
    }

    if (email && user.email !== email) {
      previousData.email = user.email;
      updatedData.email = email;
      isUpdated = true;
    }

    if (password && !(await bcrypt.compare(password, user.password))) {
      previousData.password = user.password;
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
      isUpdated = true;
    }

    if (gender && user.gender !== gender) {
      previousData.gender = user.gender;
      updatedData.gender = gender;
      isUpdated = true;
    }

    if (dob && user.dob !== dob) {
      previousData.dob = user.dob;
      updatedData.dob = dob;
      isUpdated = true;
    }

    if (req.file) {
      const updatedProfilePicture = req.file.path;
      previousData.profilePicture = user.profilePicture;

      if (user.profilePicture) {
        const oldFilePath = path.join(__dirname, "..", user.profilePicture);
        try {
          await unlinkAsync(oldFilePath);
          console.log("unlink done");
        } catch (err) {
          console.error("Error deleting old profile photo:", err);
        }
      }

      updatedData.profilePicture = updatedProfilePicture;
      isUpdated = true;
    }

    if (!isUpdated) {
      return res.status(400).json({
        success: false,
        message: "No changes were made !",
      });
    }

    user.set(updatedData);
    await user.save();

    logger(
      "User Profile Update",
      `${loggedInUser.userName} has updated his profile details.`,
      previousData,
      updatedData
    );

    return res.status(200).json({
      success: true,
      message: "User profile info updated successfully.",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile details",
      error: error.message,
    });
  }
};

module.exports = { createUser, updateUser };
