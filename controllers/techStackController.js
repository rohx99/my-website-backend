const TechStack = require("../models/techStackModel");
const { logger } = require("../utils/logger");
const unlinkAsync = require("../utils/unlinkAsync");

const createTechStack = async (req, res) => {
  const { title } = req.body;
  const { path } = req.file;
  const loggedInUser = req.user;

  try {
    const existingTechStack = await TechStack.findOne({ title });
    if (existingTechStack) {
      return res.status(400).json({
        success: false,
        message: "Tech Stack already present",
      });
    }

    await logger(
      "Tech Stack Created",
      `${loggedInUser.userName} has created a tech stack with title - "${title}"`
    );

    await TechStack.create({
      title,
      image: path,
    });
    return res.status(201).json({
      success: true,
      message: "Tech Stack created successfully",
    });
  } catch (error) {
    console.log(error);
    unlinkAsync(path);
    return res.status(500).json({
      success: false,
      message: "Failed to create new tech card",
      error: error.message,
    });
  }
};

const getAllTechStacks = async (req, res) => {
  try {
    const techStacks = await TechStack.find();

    return res.status(200).json({
      success: true,
      message: "All tech stach fetched successfully",
      techStacks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch all tech stacks",
      error: error.message,
    });
  }
};

const updateTechStackById = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const loggedInUser = req.user;

  try {
    const techStack = await TechStack.findById(id);

    const previousData = {};
    const updatedData = {};
    let isUpdated = false;

    if (title && title !== techStack.title) {
      previousData.title = techStack.title;
      updatedData.title = title;
      isUpdated = true;
    }

    if (req.file) {
      previousData.image = techStack.image;
      try {
        await unlinkAsync(techStack.image);
      } catch (error) {
        console.log(error);
      }
      updatedData.image = req.file.path;
      isUpdated = true;
    }

    if (!isUpdated) {
      return res.status(400).json({
        success: false,
        message: "No changes were made !",
      });
    }

    techStack.set(updatedData);
    await techStack.save();

    await logger(
      "Tech Stack Updated",
      `${loggedInUser.userName} has update a tech stack with title - "${techStack.title}"`,
      previousData,
      updatedData
    );

    return res.status(200).json({
      success: true,
      message: "Tech Stack updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update tech stack",
      error: error.message,
    });
  }
};

const deleteTechStackById = async (req, res) => {
  const { id } = req.params;
  const loggedInUser = req.user;

  try {
    const deletedTechStack = await TechStack.findByIdAndDelete(id);

    await unlinkAsync(deletedTechStack.image);

    await logger(
      "Tech Stack Deleted",
      `${loggedInUser.userName} has deleted a tech stack with title - "${deletedTechStack.title}"`
    );

    return res.status(200).json({
      success: true,
      message: "Tech Stack deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete tech stack",
      error: error.message,
    });
  }
};

module.exports = {
  createTechStack,
  getAllTechStacks,
  updateTechStackById,
  deleteTechStackById,
};
