import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import User from './models/user.js';
import Note from './models/note.js';
import authenticateToken from "./middleware/auth.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get('/', (req, res) => {
  res.send("Hello World!");
});

app.post('/create-account', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(400).json({ error: true, message: "Name is required." });
  }

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required." });
  }

  if (!password) {
    return res.status(400).json({ error: true, message: "Password is required." });
  }

  const isUser = await User.findOne({ email: email });
  if (isUser) {
    return res.status(400).json({ error: true, message: "User already exists." });
  }

  const user = new User ({
    name,
    email,
    password
  });
  
  await user.save();

  const accessToken = jwt.sign(user.toObject(), process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration successful.",
  });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required." });
  }

  if (!password) {
    return res.status(400).json({ error: true, message: "Password is required." });
  }

  const isUser = await User.findOne({ email: email });
  if (!isUser) {
    return res.status(400).json({ error: true, message: "User not found." });
  }

  if (isUser.email === email && isUser.password === password) {
    const userPayload = isUser.toObject ? isUser.toObject() : isUser;
    const accessToken = jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
    return res.json({
      error: false,
      email,
      accessToken,
      message: "Login successful."
    })
  } else {
    return res.status(400).json({ error: true, message: "Invalid credentials." });
  }
});

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

app.listen(3000);

export default app;
