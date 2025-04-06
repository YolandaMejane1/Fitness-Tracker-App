import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  exercise: { type: String, required: true },
  reps: Number,
  sets: Number,
  weight: Number,
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Workout", workoutSchema);