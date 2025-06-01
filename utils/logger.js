const AuditLog = require("../models/auditLogModel");

const logger = async (action, description, previousData, updatedData) => {
  try {
    await AuditLog.create({
      action,
      description,
      previousData,
      updatedData,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { logger };
