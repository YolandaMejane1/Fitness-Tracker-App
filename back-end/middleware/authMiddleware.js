import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ message: 'Please sign in to continue' });

  try {
    const decoded = jwt.verify(token, env.jwtSecret, { algorithms: ['HS256'] });
    req.user = { userId: decoded.userId };
    next();
  } catch {
    res.status(401).json({ message: 'Your session has expired. Please sign in again' });
  }
};

export default authMiddleware;
