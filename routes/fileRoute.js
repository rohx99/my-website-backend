const express = require("express");
const {
  uploadFile,
  deleteFile,
  getAllFiles,
} = require("../controllers/fileController");
const upload = require("../config/multer");
const protectedRoute = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protectedRoute, upload.single("file"), uploadFile);
router.get("/", protectedRoute, getAllFiles);
router.delete("/:id", protectedRoute, deleteFile);

module.exports = router;
