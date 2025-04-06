import Workout from "../models/Workout.js";

export const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({ userId: req.user.uid });
  res.json(workouts);
};

export const addWorkout = async (req, res) => {
  const { exercise, reps, sets, weight, date } = req.body;
  const workout = new Workout({ userId: req.user.uid, exercise, reps, sets, weight, date });
  await workout.save();
  res.status(201).json(workout);
};

export const updateWorkout = async (req, res) => {
  const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(workout);
};

export const deleteWorkout = async (req, res) => {
  await Workout.findByIdAndDelete(req.params.id);
  res.status(204).send();
};