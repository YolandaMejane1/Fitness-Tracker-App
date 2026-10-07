import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

app.set('trust proxy', 1); // behind Render's proxy: correct IPs for rate limiting
app.use(helmet());
app.use(cors({ origin: env.clientOrigins }));
app.use(express.json({ limit: '50kb' }));

app.get('/', (req, res) => res.json({ status: 'ok', message: 'Fitness Tracker API' }));

// Connect lazily so the server can start (and health-check) even if Mongo is slow.
app.use('/api', async (req, res, next) => {
  try { await connectDB(); next(); } catch (e) { next(e); }
});

app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
