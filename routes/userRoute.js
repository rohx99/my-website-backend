const express = require("express");
const upload = require("../config/multer");
const { createUser } = require("../controllers/userController");

const router = express.Router();

router.post("/", upload.single("profilePhoto"), createUser);

module.exports = router;
