import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { addWorkout } from '../services/api'; 

const LogWorkout = () => {
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { exercise, reps, date } = e.target.elements;

    const workoutData = {
      exercise: exercise.value,
      reps: reps.value,
      date: date.value,
    };

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error('User is not authenticated');

      const token = await user.getIdToken();

      await addWorkout(workoutData, token); 

      e.target.reset();
    } catch (error) {
      setError('Error adding workout: ' + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Log Your Workout
        </h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>} 

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="exercise">
            Exercise
          </label>
          <input
            name="exercise"
            type="text"
            placeholder="Enter exercise"
            required
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="reps">
            Reps
          </label>
          <input
            name="reps"
            type="text"
            placeholder="Enter reps"
            required
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700" htmlFor="date">
            Date
          </label>
          <input
            name="date"
            type="date"
            required
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Log Workout
        </button>
      </form>
    </div>
  );
};

export default LogWorkout;
