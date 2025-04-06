import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWorkouts, updateWorkout } from "../services/api";

const EditWorkout = () => {
  const [workout, setWorkout] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkout = async () => {
      const data = await getWorkouts(); 
      const selected = data.find((w) => w._id === id || w.id === id);
      setWorkout(selected || {});
    };
    fetchWorkout();
  }, [id]);

  const handleChange = (e) => {
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateWorkout(id, workout);
    alert("Updated!");
    navigate("/progress");
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="p-6 max-w-md mx-auto mt-10 text-red-600 font-light"
    >
      <h2 className="text-2xl mb-4 text-center">Edit Workout</h2>
      {["exercise", "reps", "sets", "weight", "date"].map((field) => (
        <input
          key={field}
          name={field}
          value={workout[field] || ""}
          placeholder={field}
          className="block w-full mb-4 border p-2"
          onChange={handleChange}
        />
      ))}
      <button type="submit" className="w-full bg-red-600 text-white py-2 rounded">
        Update
      </button>
    </form>
  );
};

export default EditWorkout;
