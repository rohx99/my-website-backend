const Note = require("../models/noteModel");
const { logger } = require("../utils/logger");

const createNote = async (req, res) => {
  const { title, description } = req.body;
  const loggedInUser = req.user;
  try {
    const existingNote = await Note.findOne({ title });
    if (existingNote) {
      return res.status(400).json({
        success: false,
        message: "Note with same title already exists",
      });
    }

    await Note.create({
      title,
      description,
    });

    await logger(
      "New Note Created",
      `${loggedInUser.userName} has created a new note with title - "${title}"`
    );

    return res.status(201).json({
      success: true,
      message: "Note created successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create note",
      error: error.message,
    });
  }
};

const getAllNote = async (req, res) => {
  try {
    const allNotes = await Note.find();

    return res.status(200).json({
      success: true,
      message: "All notes fetched successfully.",
      notes: allNotes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch all notes",
      error: error.message,
    });
  }
};

const getNoteById = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findById(id);

    return res.status(200).json({
      success: true,
      message: "Note fetched successfully.",
      note,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch note by id",
      error: error.message,
    });
  }
};

const updateNoteById = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const loggedInUser = req.user;
  try {
    const note = await Note.findById(id);

    const previousData = {};
    const updatedData = {};
    let isUpdated = false;

    if (title && note.title !== title) {
      previousData.title = note.title;
      updatedData.title = title;
      isUpdated = true;
    }
    if (description && note.description !== description) {
      previousData.description = note.description;
      updatedData.description = description;
      isUpdated = true;
    }

    if (!isUpdated) {
      return res.status(400).json({
        success: false,
        message: "No changes were made !",
      });
    }

    await logger(
      "Note Updated",
      `${loggedInUser.userName} has update a note with title - "${note.title}"`,
      previousData,
      updatedData
    );

    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update note",
      error: error.message,
    });
  }
};

const deleteNoteById = async (req, res) => {
  const { id } = req.params;
  const loggedInUser = req.user;
  try {
    const deletedNote = await Note.findByIdAndDelete(id);
    await logger(
      "Note Deleted",
      `${loggedInUser.userName} has deleted a note with title - "${deletedNote.title}"`
    );
    return res.status(200).json({
      success: true,
      message: "Note deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete note",
      error: error.message,
    });
  }
};

module.exports = {
  createNote,
  getAllNote,
  getNoteById,
  updateNoteById,
  deleteNoteById,
};
