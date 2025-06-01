const express = require("express");
const getAllLogs = require("../controllers/auditLogController");

const router = express.Router();

router.get("/", getAllLogs);

module.exports = router;
