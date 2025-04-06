import React from "react";
import { Link } from "react-router-dom";

const Auth = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white text-red-600 font-light">
      <div className="text-center">
        <h1 className="text-4xl mb-4">Welcome to Fitness Tracker</h1>
        <p className="mb-6">Track your workouts and progress</p>
        <div className="space-x-4">
          <Link to="/signup" className="px-4 py-2 border border-red-600 rounded">
            Sign Up
          </Link>
          <Link to="/login" className="px-4 py-2 border border-red-600 rounded">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
