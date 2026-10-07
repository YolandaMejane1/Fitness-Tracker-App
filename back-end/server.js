import app from './app.js';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';

if (!env.jwtSecret || env.jwtSecret.length < 32) {
  console.error('JWT_SECRET must be set and at least 32 characters long.');
  process.exit(1);
}

app.listen(env.port, () => console.log(`Server running on port ${env.port}`));
connectDB().then(() => console.log('MongoDB connected')).catch((e) => console.error('MongoDB error:', e.message));
