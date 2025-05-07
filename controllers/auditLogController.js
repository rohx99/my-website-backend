const AuditLog = require("../models/auditLogModel");

const getAllLogs = async (req, res) => {
  try {
    const allLogs = await AuditLog.find();

    if (allLogs.length === 0) {
      return res.status(204).json({
        success: true,
        message: "No logs availabel",
      });
    }

    return res.status(200).json({
      success: true,
      allLogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve logs",
      error: error.message,
    });
  }
};

module.exports = getAllLogs;
