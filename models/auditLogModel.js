const { Schema, model } = require("mongoose");

const auditLogSchema = new Schema(
  {
    action: { type: String, required: true },
    description: { type: String, required: true },
    ip: { type: String, required: false },
  },
  { timestamps: true }
);

const File = model("file", auditLogSchema);

module.exports = File;
