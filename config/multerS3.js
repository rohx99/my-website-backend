const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("./awsConfig");

const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: "private",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `images/${Date.now().toString()}_${file.originalname}`);
    },
  }),
});

module.exports = uploadS3;
