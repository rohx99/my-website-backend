const express = require("express");
const getAllLogs = require("../controllers/auditLogController");

const router = express.Router();

router.post("/", getAllLogs);

module.exports = router;
