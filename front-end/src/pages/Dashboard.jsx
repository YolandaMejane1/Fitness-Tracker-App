import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);
  const [stats, setStats] = useState({ totalWorkouts: 0, totalVolume: 0, maxWeight: 0 });

  useEffect(() => {
    const mockWorkouts = [
      { id: 1, exercise: 'Bench Press', reps: 10, weight: 100, date: '2025-04-01' },
      { id: 2, exercise: 'Squat', reps: 8, weight: 150, date: '2025-04-03' },
      { id: 3, exercise: 'Deadlift', reps: 6, weight: 180, date: '2025-04-06' },
    ];
    setWorkouts(mockWorkouts);

    const totalVolume = mockWorkouts.reduce((acc, w) => acc + (w.reps * (w.weight || 0)), 0);
    const maxWeight = Math.max(...mockWorkouts.map(w => w.weight || 0));
    setStats({ totalWorkouts: mockWorkouts.length, totalVolume, maxWeight });
  }, []);

  return (
    <div className="bg-white min-h-screen text-red-800 pt-20 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-800">Welcome to Your Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-300 text-center">
          <h3 className="text-lg font-semibold mb-2">Total Workouts</h3>
          <p className="text-2xl font-bold">{stats.totalWorkouts}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-300  text-center">
          <h3 className="text-lg font-semibold mb-2">Total Volume Lifted</h3>
          <p className="text-2xl font-bold">{stats.totalVolume} kg</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-300  text-center">
          <h3 className="text-lg font-semibold mb-2">Max Weight</h3>
          <p className="text-2xl font-bold">{stats.maxWeight} kg</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-300  text-center">
          <h3 className="text-lg font-semibold mb-2">Recent Workouts</h3>
          {workouts.length === 0 ? (
            <p>No recent data</p>
          ) : (
            <ul className="text-sm">
              {workouts.slice(0, 3).map((workout) => (
                <li key={workout.id} className="mb-2 border-b pb-2">
                  <p className="font-medium">{workout.exercise}</p>
                  <p>{workout.reps} reps @ {workout.weight} kg</p>
                  <p className="text-gray-500 text-xs">{workout.date}</p>
                </li>
              ))}
            </ul>
          )}
          <Link
            to="/editworkout"
            className="mt-4 inline-block bg-red-800 text-white py-1 px-3 rounded-lg hover:bg-red-900"
          >
            See All Logs
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-center text-white">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-white text-center">
          <Link
            to="/logworkout"
            className="bg-red-800 py-2 rounded-xl hover:bg-red-900"
          >
            Log New Workout
          </Link>
          <Link
            to="/progress"
            className="bg-red-800 py-2 rounded-xl hover:bg-red-900"
          >
            Track Your Progress
          </Link>
          <Link
            to="/editworkout"
            className="bg-red-800 py-2 rounded-xl hover:bg-red-900"
          >
            Edit Past Workouts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
