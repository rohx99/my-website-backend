const Homepage = require("../models/homepageModel");
const { logger } = require("../utils/logger");
const unlinkAsync = require("../utils/unlinkAsync");
const path = require("path");

const createHomepage = async (req, res) => {
  try {
    const { title, para1, para2, image, resume } = req.body;

    await Homepage.create({
      title,
      para1,
      para2,
      image,
      resume,
    });

    return res.status(201).json({
      success: true,
      message: "Homepage created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.staus(500).json({
      success: false,
      message: "Failed to create homepage",
      error: error.message,
    });
  }
};

const getHomepageDetails = async (req, res) => {
  try {
    const homepageDetails = await Homepage.findOne();
    return res.status(200).json({
      success: true,
      message: "Homepage retrieved successfully",
      homepageDetails,
    });
  } catch (error) {
    console.log(error);
    return res.staus(500).json({
      success: false,
      message: "Failed to retrieve homepage details",
      error: error.message,
    });
  }
};

const updateHomepageDetails = async (req, res) => {
  const { title, para1, para2 } = req.body;

  const loggedInUser = req.user;

  try {
    const homepage = await Homepage.findOne();

    const previousData = {};
    const updatedData = {};
    let isUpdated = false;

    if (title && homepage.title !== title) {
      previousData.title = homepage.title;
      updatedData.title = title;
      isUpdated = true;
    }
    if (para1 && homepage.para1 !== para1) {
      previousData.para1 = homepage.para1;
      updatedData.para1 = para1;
      isUpdated = true;
    }
    if (para2 && homepage.para2 !== para2) {
      previousData.para2 = homepage.para2;
      updatedData.para2 = para2;
      isUpdated = true;
    }

    if (req.files.image) {
      const updatedImage = req.files.image[0].path;
      previousData.image = homepage.image;

      if (homepage.image) {
        const oldFilePath = path.join(__dirname, "..", homepage.image);
        try {
          await unlinkAsync(oldFilePath);
        } catch (err) {
          console.error("Error deleting old profile photo:", err);
        }
      }

      updatedData.image = updatedImage;
      isUpdated = true;
    }

    if (req.files.resume) {
      const updatedResume = req.files.resume[0].path;
      previousData.resume = homepage.resume;

      if (homepage.resume) {
        const oldFilePath = path.join(__dirname, "..", homepage.resume);
        try {
          await unlinkAsync(oldFilePath);
        } catch (err) {
          console.error("Error deleting old profile photo:", err);
        }
      }

      updatedData.resume = updatedResume;
      isUpdated = true;
    }

    if (!isUpdated) {
      return res.status(400).json({
        success: false,
        message: "No changes were made !",
      });
    }

    homepage.set(updatedData);
    await homepage.save();

    logger(
      "Homepage Details Update",
      `${loggedInUser.userName} has updated his homepage details.`,
      previousData,
      updatedData
    );

    return res.status(200).json({
      success: true,
      message: "Homepage details updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update homepage details",
      error: error.message,
    });
  }
};

module.exports = { createHomepage, getHomepageDetails, updateHomepageDetails };
