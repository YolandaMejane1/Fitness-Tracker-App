import express from 'express';
import {
  getAllWorkouts,
  addWorkout,
  updateWorkout,
  deleteWorkout,
  getProgress,
} from '../controllers/workoutController.js';

const router = express.Router();

router.get('/', getAllWorkouts);

router.post('/', addWorkout);

router.put('/:id', updateWorkout);

router.delete('/:id', deleteWorkout);

router.get('/progress/track', getProgress);

export default router;
