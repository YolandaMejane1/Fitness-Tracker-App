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

router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { exercise, reps, sets, weight, date } = req.body;

  try {
    const workout = await Workout.findOne({ _id: id, userId: req.user.userId });

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found or you are not authorized to update this workout' });
    }

    workout.exercise = exercise;
    workout.reps = reps;
    workout.sets = sets;
    workout.weight = weight;
    workout.date = date;

    await workout.save();
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update workout' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedWorkout = await Workout.findOneAndDelete({ _id: id, userId: req.user.userId });

    if (!deletedWorkout) {
      return res.status(404).json({ message: 'Workout not found or you are not authorized to delete this workout' });
    }

    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete workout', error: err.message });
  }
});

export default router;