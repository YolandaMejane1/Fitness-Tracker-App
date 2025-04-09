import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { decodeToken } from "../services/authService";

const EditWorkout = () => {
  const [workouts, setWorkouts] = useState([]);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    const decodedToken = decodeToken(token);
    return decodedToken.userId;
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://fitness-tracker-app-iuw4.onrender.com/api/workouts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWorkouts(response.data);
      } catch (error) {
        console.error("Error fetching workouts:", error.message);
      }
    };
    fetchWorkouts();
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...workouts];
    updated[index][field] = value;
    setWorkouts(updated);
  };

  const handleUpdate = async (e, workoutId) => {
    e.preventDefault();
    const updatedWorkout = workouts.find((workout) => workout._id === workoutId);
    updatedWorkout.reps = Number(updatedWorkout.reps);
    updatedWorkout.sets = Number(updatedWorkout.sets);
    updatedWorkout.weight = Number(updatedWorkout.weight);
    try {
      const token = localStorage.getItem("token");
      await axios.put(`https://fitness-tracker-app-iuw4.onrender.com/api/workouts/${workoutId}`, updatedWorkout, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(`Workout ${workoutId} updated successfully!`);
      const response = await axios.get("https://fitness-tracker-app-iuw4.onrender.com/api/workouts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWorkouts(response.data);
    } catch (error) {
      console.error("Error updating workout:", error.response ? error.response.data : error.message);
      alert("Error updating workout. Please try again.");
    }
  };

  const handleDelete = async (workoutId) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Deleting workout with ID:", workoutId);
      const response = await axios.delete(`https://fitness-tracker-app-iuw4.onrender.com/api/workouts/${workoutId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Delete response:", response.data);
      setWorkouts(workouts.filter((workout) => workout._id !== workoutId));
      alert(`Workout ${workoutId} deleted successfully!`);
    } catch (error) {
      console.error("Error deleting workout:", error.response ? error.response.data : error.message);
      alert("Error deleting workout. Please try again.");
    }
  };

  return (
    <div className="w-screen h-screen pt-20 px-4 sm:px-8 md:px-16 lg:px-20 text-red-800 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8">Your Workouts</h2>
      {workouts.length === 0 ? (
        <p className="text-center">No workouts to edit.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {workouts.slice().reverse().map((workout, index) => (
            <form
              key={workout._id}
              onSubmit={(e) => handleUpdate(e, workout._id)}
              className="mb-8 border border-red-800 rounded-xl p-6 shadow-md bg-black bg-opacity-90 text-white sm:w-11/12 sm:mx-auto md:w-5/6 lg:w-full relative"
            >
              <button
                type="button"
                onClick={() => handleDelete(workout._id)}
                className="absolute bottom-8 right-5 text-white text-xl"
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
              <h3 className="text-lg font-semibold mb-4">Workout #{index + 1}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                {["exercise", "reps", "sets", "weight"].map((field) => (
                  <div key={field} className="flex flex-col">
                    <label className="mb-1 capitalize text-sm font-medium text-gray-100">{field}</label>
                    <input
                      name={field}
                      value={workout[field]}
                      placeholder={field}
                      type={field === "date" ? "date" : "text"}
                      onChange={(e) => handleChange(index, field, e.target.value)}
                      className="p-2 border rounded bg-white text-black bg-opacity-70"
                    />
                  </div>
                ))}
                <div key="date" className="flex flex-col sm:col-span-2">
                  <label className="mb-1 capitalize text-sm font-medium text-gray-300">Date</label>
                  <input
                    name="date"
                    value={workout.date}
                    onChange={(e) => handleChange(index, "date", e.target.value)}
                    type="date"
                    className="p-2 border rounded w-full bg-white text-black bg-opacity-70"
                  />
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-300">* Weight in <strong>kgs</strong></p>
              <button type="submit" className="mt-4 bg-red-800 text-white py-2 px-6 rounded hover:bg-red-900">
                Update Workout
              </button>
            </form>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditWorkout;
