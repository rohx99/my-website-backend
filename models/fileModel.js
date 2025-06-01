const { Schema, model } = require("mongoose");

const fileSchema = new Schema(
  {
    fileName: { type: String, required: true },
    path: { type: String, required: false },
  },
  { timestamps: true }
);

const File = model("file", fileSchema);

module.exports = File;
