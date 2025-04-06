import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const recentWorkouts = [
    { id: 1, date: '2025-04-06', exercise: 'Push-Ups', reps: '3 sets of 15' },
    { id: 2, date: '2025-04-05', exercise: 'Squats', reps: '3 sets of 20' },
    { id: 3, date: '2025-04-04', exercise: 'Plank', reps: '3 sets of 60s' },
  ];

  return (
    <div className="text-center text-red-700">
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6 border">
          <h2 className="text-xl font-semibold mb-4">Recent Workouts</h2>
          <ul>
            {recentWorkouts.map((workout) => (
              <li key={workout.id} className="mb-2 border-b pb-2">
                <p className="font-medium">{workout.exercise}</p>
                <p>{workout.reps}</p>
                <p className="text-sm text-gray-500">{workout.date}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <div className="flex flex-col gap-4 text-white">
            <Link
              to="/logworkout"
              className="bg-red-500 py-2 rounded-xl hover:bg-red-600"
            >
              Log New Workout
            </Link>
            <Link
              to="/progress"
              className="bg-red-500 py-2 rounded-xl hover:bg-red-600"
            >
              Track Your Progress
            </Link>
            <Link
              to="/editworkout"
              className="bg-red-500 py-2 rounded-xl hover:bg-red-600"
            >
              Edit Past Workouts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
