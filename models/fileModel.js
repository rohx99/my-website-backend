const { Schema, model } = require("mongoose");

const fileSchema = new Schema(
  {
    fileName: { type: String, required: true, unique: true },
    uploadedFile: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const File = model("file", fileSchema);

module.exports = File;
