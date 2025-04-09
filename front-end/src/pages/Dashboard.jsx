import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getToken, decodeToken } from '../services/authService';
import { fetchWorkouts } from '../api/workoutApi';

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);
  const [stats, setStats] = useState({ totalWorkouts: 0, totalVolume: 0, maxWeight: 0 });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = decodeToken();
        setUserId(decoded.userId);
      } catch (err) {
        console.error('Invalid token:', err);
      }
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const getWorkouts = async () => {
      try {
        const data = await fetchWorkouts(userId);
        setWorkouts(data);

        const totalVolume = data.reduce((acc, w) => acc + (w.reps * (w.weight || 0)), 0);
        const maxWeight = Math.max(...data.map(w => w.weight || 0), 0);
        const totalWorkouts = data.length;

        setStats({ totalWorkouts, totalVolume, maxWeight });
      } catch (err) {
        console.error('Error fetching workouts:', err.message);
      }
    };

    getWorkouts();
  }, [userId]);

  return (
    <div 
      className="min-h-screen w-screen bg-cover bg-center relative" 
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1570477368836-cfd3adba150c?q=80&w=1444&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-white pt-20 px-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Welcome to Your Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-black bg-opacity-50 rounded-2xl shadow-lg p-6 border border-gray-300 text-center backdrop-blur-md transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:rotate-3d">
            <h3 className="text-lg font-semibold mb-2">Total Workouts</h3>
            <p className="text-2xl font-bold">{stats.totalWorkouts}</p>
          </div>

          <div className="bg-black bg-opacity-50 rounded-2xl shadow-lg p-6 border border-gray-300 text-center backdrop-blur-md transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:rotate-3d">
            <h3 className="text-lg font-semibold mb-2">Total Volume Lifted</h3>
            <p className="text-2xl font-bold">{stats.totalVolume} kg</p>
          </div>

          <div className="bg-black bg-opacity-50 rounded-2xl shadow-lg p-6 border border-gray-300 text-center backdrop-blur-md transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:rotate-3d">
            <h3 className="text-lg font-semibold mb-2">Max Weight</h3>
            <p className="text-2xl font-bold">{stats.maxWeight} kg</p>
          </div>

          <div className="bg-black bg-opacity-50 rounded-2xl shadow-lg p-6 border border-gray-300 text-center backdrop-blur-md transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:rotate-3d">
            <h3 className="text-lg font-semibold mb-2">Recent Workouts</h3>
            {workouts.length === 0 ? (
              <p>No recent data</p>
            ) : (
              <ul className="text-sm">
                {workouts.slice(0, 3).map((workout) => (
                  <li key={workout._id} className="mb-2 border-b pb-2">
                    <p className="font-medium">{workout.exercise}</p>
                    <p>{workout.reps} reps @ {workout.weight || 0} kg</p>
                    <p className="text-gray-500 text-xs">{new Date(workout.date).toLocaleDateString()}</p>
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
          <h2 className="text-xl font-semibold mb-4 text-center text-white">Track Workouts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white text-center">
            <Link
              to="/logworkout"
              className="bg-red-800 py-2 rounded-xl hover:bg-red-900"
            >
              Log New Workout
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
    </div>
  );
};

export default Dashboard;
