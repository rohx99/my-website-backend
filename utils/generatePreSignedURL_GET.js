const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3Client = require("../config/s3Client");

const generatePresignedUrl_Get = async (key) => {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  });

  const signedUrl = await getSignedUrl(s3Client, command);
  return signedUrl;
};

module.exports = generatePresignedUrl_Get;
