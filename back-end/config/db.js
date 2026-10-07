import mongoose from 'mongoose';
import { env } from './env.js';

let connecting = null;

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  if (!env.mongoUri) throw new Error('MONGO_URI is not set');
  if (!connecting) {
    connecting = mongoose
      .connect(env.mongoUri, { serverSelectionTimeoutMS: 8000 })
      .catch((err) => { connecting = null; throw err; });
  }
  await connecting;
};
