import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import User from './user.js';

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

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "50m" });

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
    const user = { user: isUser };
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "50m" });
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

app.listen(3000);

export default app;
