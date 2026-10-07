import express from 'express';
import { body, query } from 'express-validator';
import Workout from '../models/Workout.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { validate, validObjectId } from '../middleware/validate.js';
import { buildStats } from '../utils/stats.js';
import { ApiError } from '../utils/ApiError.js';

const router = express.Router();
router.use(authMiddleware);

const fields = [
  body('exercise').trim().notEmpty().withMessage('Choose an exercise').isLength({ max: 60 }),
  body('reps').isInt({ min: 1, max: 1000 }).withMessage('Reps must be between 1 and 1000').toInt(),
  body('sets').isInt({ min: 1, max: 100 }).withMessage('Sets must be between 1 and 100').toInt(),
  body('weight').isFloat({ min: 0, max: 2000 }).withMessage('Weight must be between 0 and 2000 kg').toFloat(),
  body('date').isISO8601().withMessage('Enter a valid date').toDate(),
  body('notes').optional({ values: 'falsy' }).isString().isLength({ max: 500 })
    .withMessage('Notes can be up to 500 characters'),
];

const pick = (b) => ({
  exercise: b.exercise, reps: b.reps, sets: b.sets, weight: b.weight, date: b.date, notes: b.notes || '',
});

// List (optionally filtered): ?exercise=Squat&from=2026-01-01&to=2026-02-01
router.get(
  '/',
  query('from').optional().isISO8601(),
  query('to').optional().isISO8601(),
  validate,
  async (req, res, next) => {
    try {
      const filter = { userId: req.user.userId };
      if (req.query.exercise) filter.exercise = String(req.query.exercise);
      if (req.query.from || req.query.to) {
        filter.date = {};
        if (req.query.from) filter.date.$gte = new Date(req.query.from);
        if (req.query.to) filter.date.$lte = new Date(req.query.to);
      }
      res.json(await Workout.find(filter).sort({ date: -1, createdAt: -1 }));
    } catch (e) { next(e); }
  }
);

// Must come before '/:id'
router.get('/stats', async (req, res, next) => {
  try {
    const workouts = await Workout.find({ userId: req.user.userId }).lean();
    res.json(buildStats(workouts));
  } catch (e) { next(e); }
});

router.get('/:id', validObjectId, async (req, res, next) => {
  try {
    const w = await Workout.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!w) throw new ApiError(404, 'Workout not found');
    res.json(w);
  } catch (e) { next(e); }
});

router.post('/', fields, validate, async (req, res, next) => {
  try {
    const w = await Workout.create({ userId: req.user.userId, ...pick(req.body) });
    res.status(201).json(w);
  } catch (e) { next(e); }
});

const update = async (req, res, next) => {
  try {
    const w = await Workout.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      pick(req.body),
      { new: true, runValidators: true }
    );
    if (!w) throw new ApiError(404, 'Workout not found');
    res.json(w);
  } catch (e) { next(e); }
};
router.put('/:id', validObjectId, fields, validate, update);
router.patch('/:id', validObjectId, fields, validate, update);

router.delete('/:id', validObjectId, async (req, res, next) => {
  try {
    const w = await Workout.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!w) throw new ApiError(404, 'Workout not found');
    res.json({ message: 'Workout deleted' });
  } catch (e) { next(e); }
});

export default router;
