import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';

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

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// app.get('/', (req, res) => {
//   res.send("Hello World!");
// });

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

export default app;
