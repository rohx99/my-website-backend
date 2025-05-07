const File = require("../models/fileModel");
const logger = require("../utils/logger");
const unlinkAsync = require("../utils/unlinkAsync");

const uploadFile = async (req, res) => {
  const { fileName } = req.body;
  const loggedInUser = req.user;
  try {
    const existingFile = await File.findOne({ fileName });
    if (existingFile) {
      return res.status(400).json({
        success: false,
        message: "File with this name already exists",
      });
    }
    const newFile = await File.create({
      fileName,
    });
    if (req.file) {
      newFile.path = req.file.path;
      await newFile.save();
    }

    logger(
      "File Upload",
      `${loggedInUser.userName} has uploaded a new file - ${fileName}`
    );

    return res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      data: newFile,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to upload the file",
      error: error.message,
    });
  }
};

const deleteFile = async (req, res) => {
  const { id } = req.params;
  const loggedInUser = req.user;
  try {
    const file = await File.findByIdAndDelete(id);
    await unlinkAsync(file.path);
    logger(
      "File Upload",
      `${loggedInUser.userName} has deleted a file - ${file.fileName}`
    );
    return res.status(200).json({
      success: true,
      message: "File deleted successfully.",
      file,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete file",
      error: error.message,
    });
  }
};

module.exports = { uploadFile, deleteFile };
