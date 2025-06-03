const express = require("express");
const protectedRoute = require("../middlewares/authMiddleware");
const {
  createNote,
  getAllNote,
  getNoteById,
  updateNoteById,
  deleteNoteById,
} = require("../controllers/noteController");

const router = express.Router();

router.post("/", protectedRoute, createNote);
router.get("/", protectedRoute, getAllNote);
router.get("/:id", protectedRoute, getNoteById);
router.put("/:id", protectedRoute, updateNoteById);
router.delete("/:id", protectedRoute, deleteNoteById);

module.exports = router;
