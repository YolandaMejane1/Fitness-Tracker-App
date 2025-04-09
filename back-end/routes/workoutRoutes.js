import express from 'express';
import Workout from '../models/Workout.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.userId });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch workouts' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  const { exercise, reps, sets, weight, date } = req.body;
  try {
    const newWorkout = new Workout({ userId: req.user.userId, exercise, reps, sets, weight, date });
    await newWorkout.save();
    res.status(201).json(newWorkout);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create workout' });
  }
});

export default router;
