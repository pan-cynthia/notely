import express from "express";
import jwt from "jsonwebtoken";

import authenticateToken from "../middleware/auth.js";

import User from "../models/user.js";

const app = express.Router();

// create a new account
app.post("/create-account", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(400).json({ error: true, message: "Name is required." });
  }

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required." });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required." });
  }

  const isUser = await User.findOne({ email: email });
  if (isUser) {
    return res
      .status(400)
      .json({ error: true, message: "User already exists." });
  }

  const user = new User({
    name,
    email,
    password,
  });

  await user.save();

  const accessToken = jwt.sign(
    user.toObject(),
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30min" }
  );

  const refreshToken = jwt.sign(
    user.toObject(),
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .json({
      error: false,
      user,
      accessToken,
      message: "Registration successful.",
    });
});

// login with email and password
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required." });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required." });
  }

  const isUser = await User.findOne({ email: email });
  if (!isUser) {
    return res.status(400).json({ error: true, message: "User not found." });
  }

  if (isUser.email === email && isUser.password === password) {
    const userPayload = isUser.toObject ? isUser.toObject() : isUser;

    const accessToken = jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30min",
    });

    const refreshToken = jwt.sign(
      userPayload,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({
        error: false,
        email,
        accessToken,
        message: "Login successful.",
      });
  } else {
    return res
      .status(400)
      .json({ error: true, message: "Invalid credentials." });
  }
});

// get user by id
app.get("/get-user", authenticateToken, async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  if (!user) {
    return res
      .status(401)
      .json({ error: true, message: "User does not exist." });
  }
  return res.json({ error: false, user, message: "Got user successfully." });
});

// refresh access token so user can stay logged in
app.post("/refresh-token", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ error: true, message: "Unauthorized" });
  }

  try {
    const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const newAccessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30min",
    });

    return res.json({
      error: false,
      accessToken: newAccessToken,
      message: "New access token generated successfully.",
    });
  } catch (error) {
    return res
      .status(403)
      .json({ error: true, message: "Invalid refresh token." });
  }
});

// clear refresh token cookie when user logs out
app.post("/logout", async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  });
  return res.json({ error: false, message: "Logged out successfully." });
});

export default app;
