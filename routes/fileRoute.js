const express = require("express");
const { uploadFile } = require("../controllers/fileController");
const uploadS3 = require("../config/multerS3");
const upload = require("../config/multer");

const router = express.Router();

router.put("/upload/s3", uploadS3.single("image"), uploadFile);
router.post("/upload/server", upload.single("image"), uploadFile);

module.exports = router;
