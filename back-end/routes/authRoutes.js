import express from 'express';
import { body } from 'express-validator';
import rateLimit from 'express-rate-limit';
import authMiddleware from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import * as auth from '../services/authService.js';

const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many attempts. Please try again in a few minutes' },
});

const email = body('email').trim().isEmail().withMessage('Enter a valid email address').normalizeEmail();
const password = body('password').isString().isLength({ min: 8, max: 100 })
  .withMessage('Password must be at least 8 characters');

router.post(
  '/signup',
  limiter,
  body('name').trim().isLength({ min: 1, max: 80 }).withMessage('Please enter your name'),
  email,
  password,
  validate,
  async (req, res, next) => {
    try { res.status(201).json(await auth.signUp(req.body)); } catch (e) { next(e); }
  }
);

router.post(
  '/login',
  limiter,
  email,
  body('password').isString().notEmpty().withMessage('Enter your password'),
  validate,
  async (req, res, next) => {
    try { res.json(await auth.logIn(req.body)); } catch (e) { next(e); }
  }
);

router.post(
  '/google',
  limiter,
  body('credential').isString().notEmpty().withMessage('Missing Google credential'),
  validate,
  async (req, res, next) => {
    try { res.json(await auth.signInWithGoogle(req.body.credential)); } catch (e) { next(e); }
  }
);

router.get('/me', authMiddleware, async (req, res, next) => {
  try { res.json({ user: await auth.getUser(req.user.userId) }); } catch (e) { next(e); }
});

export default router;
