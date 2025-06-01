const express = require("express");
const protectedRoute = require("../middlewares/authMiddleware");
const {
  sendMessage,
  getAllMessages,
  getMessageById,
} = require("../controllers/contactController");

const router = express.Router();

router.post("/", sendMessage);
router.get("/", protectedRoute, getAllMessages);
router.get("/:id", protectedRoute, getMessageById);

module.exports = router;
