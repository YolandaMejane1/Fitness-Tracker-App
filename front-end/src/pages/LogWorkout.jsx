import React, { useState } from "react";
import { addWorkout } from "../services/api";

const LogWorkout = () => {
  const [workout, setWorkout] = useState({ exercise: "", reps: "", sets: "", weight: "", date: "" });

  const handleChange = (e) => {
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addWorkout(workout);
    alert("Workout logged!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto mt-10 text-red-600 font-light">
      <h2 className="text-2xl mb-4 text-center">Log Workout</h2>
      {["exercise", "reps", "sets", "weight", "date"].map((field) => (
        <input key={field} name={field} placeholder={field} className="block w-full mb-4 border p-2" onChange={handleChange} />
      ))}
      <button type="submit" className="w-full bg-red-600 text-white py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default LogWorkout;
