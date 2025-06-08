const { Schema, model } = require("mongoose");

const techStack = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const TechStack = model("techStack", techStack);

module.exports = TechStack;
