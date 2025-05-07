const express = require("express");
const upload = require("../config/multer");
const { createUser, updateUser } = require("../controllers/userController");
const protectedRoute = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", upload.single("profilePhoto"), createUser);
router.put("/", protectedRoute, upload.single("profilePhoto"), updateUser);

module.exports = router;
