import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const GET_WORKOUTS = gql`
  query GetWorkouts {
    workouts {
      id
      date
      exercise
      reps
    }
  }
`;

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_WORKOUTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="text-center text-red-700 pt-20">
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6 border">
          <h2 className="text-xl font-semibold mb-4">Recent Workouts</h2>
          {data.workouts.length === 0 ? (
            <p>No workouts available</p>
          ) : (
            <ul>
              {data.workouts.map((workout) => (
                <li key={workout.id} className="mb-2 border-b pb-2">
                  <p className="font-medium">{workout.exercise}</p>
                  <p>{workout.reps} Reps</p>
                  <p className="text-sm text-gray-500">{workout.date}</p>
                </li>
              ))}
            </ul>
          )}
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
