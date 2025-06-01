require("dotenv").config();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER_EMAIL,
    pass: process.env.SMTP_APP_PASSWORD,
  },
  // logger: true,
  // debug: true,
});

module.exports = { transporter };
