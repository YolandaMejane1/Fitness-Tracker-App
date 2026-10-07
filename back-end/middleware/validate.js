import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

export const validate = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) return next();
  const first = result.array()[0];
  res.status(400).json({ message: first.msg, field: first.path });
};

export const validObjectId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid workout id' });
  }
  next();
};
