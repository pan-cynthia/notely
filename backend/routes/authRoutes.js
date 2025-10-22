import express from "express";
import jwt from "jsonwebtoken";

import authenticateToken from "../middleware/auth.js";

import User from "../models/user.js";

const app = express.Router();

const isProduction = process.env.NODE_ENV === "production";

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

  const payload = {
    id: user._id,
    email: user.email,
  };

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30min",
  });

  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  const refreshTokenExp = jwt.decode(refreshToken).exp * 1000;

  return res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .json({
      error: false,
      user,
      accessToken,
      refreshTokenExp: refreshTokenExp,
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

  const payload = {
    id: isUser._id,
    email: isUser.email,
  };

  if (isUser.email === email && isUser.password === password) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30min",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    const refreshTokenExp = jwt.decode(refreshToken).exp * 1000;

    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "None" : "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({
        error: false,
        email,
        accessToken,
        refreshTokenExp: refreshTokenExp,
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
  const user = await User.findOne({ _id: req.user.id });
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
    const newAccessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30min",
      }
    );

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
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",
  });
  return res.json({ error: false, message: "Logged out successfully." });
});

export default app;
