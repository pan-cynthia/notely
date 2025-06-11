import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.get('/', (req, res) => {
  res.send("Hello World!");
});

app.listen(3000);

export default app;
