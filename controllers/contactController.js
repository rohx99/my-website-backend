const sendContactEnquiryMail = require("../emails/sendContactEnquiryMail");
const Contact = require("../models/contactModel");

const sendMessage = async (req, res) => {
  const { name, email, message, ip } = req.body;

  try {
    const contact = new Contact({ name, email, message, ip: ip || null });
    await contact.save();

    await sendContactEnquiryMail(name, email, ip, message);
    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message",
      error,
    });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find();
    return res.status(200).json({
      success: true,
      message: "Messages retrieved successfully",
      messages: messages || [],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve messages",
      error,
    });
  }
};

const getMessageById = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Contact.findById(id);
    return res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch message",
      error,
    });
  }
};

module.exports = { sendMessage, getAllMessages, getMessageById };
