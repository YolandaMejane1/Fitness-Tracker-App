import Workout from '../models/Workout.js';

export const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving workouts', error: error.message });
  }
};

export const addWorkout = async (req, res) => {
  const { exercise, reps, sets, weight, date } = req.body;

  try {
    const newWorkout = new Workout({
      exercise,
      reps,
      sets,
      weight,
      date,
    });

    const savedWorkout = await newWorkout.save();
    res.status(201).json(savedWorkout);
  } catch (error) {
    res.status(400).json({ message: 'Error adding workout log', error: error.message });
  }
};

export const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const { exercise, reps, sets, weight, date } = req.body;

  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(
      id,
      { exercise, reps, sets, weight, date },
      { new: true }
    );

    if (!updatedWorkout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    res.status(200).json(updatedWorkout);
  } catch (error) {
    res.status(400).json({ message: 'Error updating workout log', error: error.message });
  }
};

export const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedWorkout = await Workout.findByIdAndDelete(id);

    if (!deletedWorkout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
   
    res.status(400).json({ message: 'Error deleting workout log', error: error.message });
  }
};

export const getProgress = async (req, res) => {
  try {
    const workouts = await Workout.find();

    const totalWorkouts = workouts.length;
    const totalVolume = workouts.reduce(
      (acc, workout) => acc + workout.reps * workout.weight,
      0
    );
    const maxWeight = Math.max(...workouts.map((workout) => workout.weight));

    res.status(200).json({
      totalWorkouts,
      totalVolume,
      maxWeight,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving progress', error: error.message });
  }
};
