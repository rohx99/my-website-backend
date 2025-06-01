const { Schema, model } = require("mongoose");

const fileSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      minlength: [10, "Message must be at least 10 characters long"],
    },
    ip: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Contact = model("contact", fileSchema);

module.exports = Contact;
