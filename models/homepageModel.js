const { Schema, model } = require("mongoose");

const homepageSchema = new Schema(
  {
    title: { type: String, required: true },
    para1: { type: String, required: true },
    para2: { type: String, required: true },
    image: { type: String, required: false },
    resume: { type: String, required: false },
  },
  { timestamps: true }
);

const Homepage = model("homepage", homepageSchema);

module.exports = Homepage;
