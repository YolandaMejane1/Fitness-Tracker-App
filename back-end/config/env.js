import dotenv from 'dotenv';

dotenv.config();

const list = (v) => (v || '').split(',').map((s) => s.trim()).filter(Boolean);

export const env = {
  get mongoUri() { return process.env.MONGO_URI; },
  get port() { return Number(process.env.PORT) || 5002; },
  get jwtSecret() { return process.env.JWT_SECRET; },
  get googleClientId() { return process.env.GOOGLE_CLIENT_ID || ''; },
  // Comma-separated list of front-end URLs allowed to call the API.
  get clientOrigins() {
    return [...list(process.env.CLIENT_ORIGIN), 'http://localhost:3000'];
  },
  tokenDays: 7,
};
