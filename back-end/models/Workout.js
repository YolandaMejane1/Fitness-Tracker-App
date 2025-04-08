import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  exercise: String,
  reps: Number,
  sets: Number,
  weight: Number,
  date: String,
});

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;
