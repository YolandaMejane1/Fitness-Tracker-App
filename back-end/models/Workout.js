import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    exercise: { type: String, required: true, trim: true },
    reps: { type: Number, required: true, min: 1, max: 1000 },
    sets: { type: Number, required: true, min: 1, max: 100 },
    weight: { type: Number, required: true, min: 0, max: 2000 },
    date: { type: Date, required: true },
    notes: { type: String, trim: true, maxlength: 500, default: '' },
  },
  { timestamps: true }
);

workoutSchema.index({ userId: 1, date: -1 });

export default mongoose.model('Workout', workoutSchema);
