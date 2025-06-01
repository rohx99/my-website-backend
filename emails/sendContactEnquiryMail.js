const {
  sendContactEnquiryTemplate,
} = require("../templates/sendContactEnquiryTemplate");
const { transporter } = require("../utils/smtpTransporter");

const sendContactEnquiryMail = async (name, email, ip, message) => {
  try {
    await transporter.sendMail({
      from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_USER_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "New Contact Enquiry 📩",
      html: sendContactEnquiryTemplate
        .replace("{name}", name)
        .replace("{email}", email)
        .replace("{ip}", ip || "No IP address")
        .replace("{message}", message),
    });
  } catch (error) {
    throw error;
  }
};

module.exports = sendContactEnquiryMail;
