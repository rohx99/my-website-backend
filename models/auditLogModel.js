const { Schema, model } = require("mongoose");

const auditLogSchema = new Schema(
  {
    action: { type: String, required: true },
    description: { type: String, required: true },
    previousData: { type: Object, required: false },
    updatedData: { type: Object, required: false },
  },
  { timestamps: true }
);

const AuditLog = model("auditLog", auditLogSchema);

module.exports = AuditLog;
