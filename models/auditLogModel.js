const { Schema, model } = require("mongoose");

const auditLogSchema = new Schema(
  {
    action: { type: String, required: true },
    description: { type: String, required: true },
    previousData: { type: Array, required: false },
    updatedData: { type: Array, required: false },
    ip: { type: String, required: false },
  },
  { timestamps: true }
);

const AuditLog = model("auditLog", auditLogSchema);

module.exports = AuditLog;
