const File = require("../models/fileModel");

const uploadFile = async (req, res) => {
  const { fileName } = req.body;

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
      newFile.uploadedFile = req.file.path;
      await newFile.save();
    }

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

const uploadFileOnS3 = async (req, res) => {
  const { filename, contentType } = req.query;
  const key = `uploads/${Date.now()}-${filename}`;

  try {
    const url = await generatePresignedUrl(key, contentType);
    await File.create({
      filename,
      uploadedFile: key,
    });
    return res.status(201).json({ success: true, url, key });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not generate pre-signed URL" });
  }
};

module.exports = { uploadFile, uploadFileOnS3 };
