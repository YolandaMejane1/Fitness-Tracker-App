import React, { useState, useEffect } from "react";

const EditWorkout = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    setWorkouts([
      {
        id: 1,
        exercise: "Squat",
        reps: "10",
        sets: "3",
        weight: "80",
        date: "2025-04-05",
      },
      {
        id: 2,
        exercise: "Bench Press",
        reps: "8",
        sets: "4",
        weight: "60",
        date: "2025-04-06",
      },
    ]);
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...workouts];
    updated[index][field] = value;
    setWorkouts(updated);
  };

  const handleUpdate = (e, id) => {
    e.preventDefault();
    alert(`Workout ${id} updated!`);
  };

  return (
    <div className="w-full max-w-3xl pt-20 px-4 sm:px-8 md:px-16 lg:px-20 text-red-700 mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Edit Past Workouts</h2>
      {workouts.length === 0 ? (
        <p className="text-center">No workouts to edit.</p>
      ) : (
        workouts.map((workout, index) => (
          <form
            key={workout.id}
            onSubmit={(e) => handleUpdate(e, workout.id)}
            className="mb-8 border border-red-300 rounded-xl p-6 shadow-md bg-white"
          >
            <h3 className="text-lg font-semibold mb-4">
              Workout #{workout.id}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
              {["exercise", "reps", "weight", "date"].map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="mb-1 capitalize text-sm font-medium text-gray-600">
                    {field}
                  </label>
                  <input
                    name={field}
                    value={workout[field]}
                    placeholder={field}
                    type={field === "date" ? "date" : "text"}
                    onChange={(e) =>
                      handleChange(index, field, e.target.value)
                    }
                    className="p-2 border rounded"
                  />
                </div>
              ))}
            </div>
            <p className="mt-1 text-sm text-gray-600">
              * Weight in <strong>kgs</strong>
            </p>
            <button
              type="submit"
              className="mt-4 bg-red-800 text-white py-2 px-6 rounded hover:bg-red-900"
            >
              Update Workout
            </button>
          </form>
        ))
      )}
    </div>
  );
};

export default EditWorkout;
