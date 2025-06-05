const express = require("express");
const upload = require("../config/multer");
const protectedRoute = require("../middlewares/authMiddleware");
const {
  createHomepage,
  getHomepageDetails,
  updateHomepageDetails,
} = require("../controllers/homepageController");

const router = express.Router();

router.post("/", createHomepage);
router.get("/", getHomepageDetails);
router.put("/", protectedRoute, upload.single("image"), updateHomepageDetails);

module.exports = router;
