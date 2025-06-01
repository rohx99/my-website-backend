const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, required: false },
    gender: { type: String, required: false },
    dob: { type: String, required: false },
  },
  { timestamps: true }
);

const User = model("user", userSchema);

module.exports = User;
