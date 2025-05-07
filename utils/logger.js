const AuditLog = require("../models/auditLogModel");

const logger = async (action, description, previousData, updatedData, ip) => {
  try {
    await AuditLog.create({
      action,
      description,
      previousData,
      updatedData,
      ip,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = logger;
