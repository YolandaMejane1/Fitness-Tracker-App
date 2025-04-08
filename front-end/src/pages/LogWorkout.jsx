import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const exercises = [
  { name: 'Push-Up', target: 'Chest, Triceps, Shoulders' },
  { name: 'Squat', target: 'Quads, Glutes, Hamstrings' },
  { name: 'Deadlift', target: 'Back, Glutes, Hamstrings' },
  { name: 'Bench Press', target: 'Chest, Triceps, Shoulders' },
  { name: 'Pull-Up', target: 'Back, Biceps' },
  { name: 'Lunges', target: 'Quads, Glutes, Hamstrings' },
  { name: 'Plank', target: 'Core' },
  { name: 'Bicep Curl', target: 'Biceps' },
  { name: 'Tricep Dip', target: 'Triceps' },
  { name: 'Shoulder Press', target: 'Shoulders, Triceps' },
  { name: 'Pilates', target: 'Obliques, Core' },
  { name: 'Mountain Climbers', target: 'Core, Cardio' },
  { name: 'Leg Press', target: 'Quads, Glutes, Hamstrings' },
  { name: 'Calf Raise', target: 'Calves' },
  { name: 'Lat Pulldown', target: 'Back, Biceps' },
  { name: 'Leg Curl', target: 'Hamstrings' },
];

const LogWorkout = () => {
  const [error, setError] = useState('');
  const [exerciseName, setExerciseName] = useState('');
  const [selectedExercise, setSelectedExercise] = useState('');
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const exercise = queryParams.get('exercise');
    if (exercise) {
      setSelectedExercise(exercise);
      setExerciseName(exercise);
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { reps, date } = e.target.elements;

    const workoutData = {
      exercise: selectedExercise,
      reps: reps.value,
      date: date.value,
    };

    try {
      console.log('Workout logged:', workoutData);
      e.target.reset();
      setSelectedExercise('');
    } catch (error) {
      setError('Error adding workout: ' + error.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/4162491/pexels-photo-4162491.jpeg?auto=compress&cs=tinysrgb&w=1600')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 backdrop-blur-lg bg-white bg-opacity-5 p-8 rounded-2xl shadow-lg border border-red-900 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">
          Log Your Workout
        </h2>

        {error && <p className="text-white text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-white" htmlFor="exercise">
            Exercise
          </label>
          <select
            name="exercise"
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
            required
            className="w-full p-3 mt-1 bg-white bg-opacity-20 text-white border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-800"
          >
            <option value="">Select an exercise</option>
            {exercises.map((exercise, index) => (
              <option key={index} value={exercise.name}>
                {exercise.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-white" htmlFor="reps">
            Reps
          </label>
          <input
            name="reps"
            type="text"
            placeholder="Enter reps"
            required
            className="w-full p-3 mt-1 bg-white bg-opacity-20 text-white border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-800 placeholder-white"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-white" htmlFor="date">
            Date
          </label>
          <input
            name="date"
            type="date"
            required
            className="w-full p-3 mt-1 bg-white bg-opacity-20 text-white border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-800 placeholder-white"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-red-800 text-white rounded-md hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-800"
        >
          Log Workout
        </button>
      </form>
    </div>
  );
};

export default LogWorkout;
