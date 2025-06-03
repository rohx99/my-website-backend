const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
  },
  { timestamps: true }
);

const Note = model("note", noteSchema);

module.exports = Note;
