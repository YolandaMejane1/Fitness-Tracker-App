import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5002;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running ✅');
});

import workoutRoutes from './routes/workoutRoutes.js';
app.use('/api/workouts', workoutRoutes);

if (!MONGO_URI) {
  console.error('❌ MONGO_URI is not defined in .env');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
