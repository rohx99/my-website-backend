const express = require("express");
const upload = require("../config/multer");
const protectedRoute = require("../middlewares/authMiddleware");
const {
  createHomepage,
  getHomepageDetails,
  updateHomepageDetails,
} = require("../controllers/homepageController");
const {
  createTechStack,
  getAllTechStacks,
  updateTechStackById,
  deleteTechStackById,
} = require("../controllers/techStackController");

const router = express.Router();

router.post("/hero-section", createHomepage);
router.get("/hero-section", getHomepageDetails);
router.put(
  "/hero-section",
  protectedRoute,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  updateHomepageDetails
);

router.post(
  "/tech-stack",
  protectedRoute,
  upload.single("image"),
  createTechStack
);
router.get("/tech-stack", getAllTechStacks);
router.put(
  "/tech-stack/:id",
  protectedRoute,
  upload.single("image"),
  updateTechStackById
);
router.delete("/tech-stack/:id", protectedRoute, deleteTechStackById);

module.exports = router;
