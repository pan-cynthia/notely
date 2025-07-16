import express from 'express';
import authenticateToken from '../middleware/auth.js';
import Note from '../models/note.js';

const app = express.Router();

// create a new note
app.post('/add-note', authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required." });
  }
  if (!content) {
    return res.status(400).json({ error: true, message: "Content is required." });
  }
  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: req.user._id
    })

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note created successfully."
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal server error", details: error.message });
  }
});

// edit and update specified note
app.put('/edit-note/:noteId', authenticateToken, async (req, res) => {
  const { noteId } = req.params;
  const userId = req.user._id;
  const { title, content, tags, isPinned } = req.body;

  if (!title && !content && !tags && isPinned === undefined) {
    return res.status(400).json({ error: true, message: "Empty value detected, changes can't be saved." });
  }

  try {
    const note = await Note.findOne({ userId: userId, _id: noteId });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found." });
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned !== undefined) note.isPinned = isPinned;

    await note.save();

    return res.json({ error: false, note, message: "Note updated successfully." });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal server error", details: error.message });
  }
});

// get all notes created by user and sort pinned notes to the top
app.get('/get-all-notes', authenticateToken, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id }).sort({ isPinned: -1 });

    return res.json({ error: false, notes, message: "Retrived all notes successfully." });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal server error", details: error.message });
  }
});

// delete specified note
app.delete('/delete-note/:noteId', authenticateToken, async (req, res) => {
  const { noteId } = req.params;
  const userId = req.user._id;

  try {
    const note = await Note.findOne({ userId: userId, _id: noteId }); // find note first

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    await Note.deleteOne({ userId: userId, _id: noteId }); // delete note if found

    return res.json({ error: false, message: "Note deleted successfully." });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal server error", details: error.message });
  }
});

//update pinned state of note
app.put('/pin-unpin-note/:noteId', authenticateToken, async (req, res) => {
  const { noteId } = req.params;
  const userId = req.user._id;
  const { isPinned } = req.body;

  try {
    const note = await Note.findOne({ userId: userId, _id: noteId });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found." });
    }

    note.isPinned = isPinned;

    await note.save();

    return res.json({ error: false, message: "Note updated successfully." });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal server error", details: error.message });
  }
});

export default app;
