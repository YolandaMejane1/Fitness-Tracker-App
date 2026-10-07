import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteWorkout, fetchWorkouts, updateWorkout } from '../api/workoutApi';
import { errorMessage } from '../api/axiosInstance';
import WorkoutForm from '../components/WorkoutForm';
import { formatDate, toDateInput } from '../utils/exercises';

// "My Workouts": full history with filter, edit-in-place and delete with confirmation.
const EditWorkout = () => {
  const [workouts, setWorkouts] = useState(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');
  const [editing, setEditing] = useState(null);
  const [confirming, setConfirming] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetchWorkouts()
      .then(setWorkouts)
      .catch((err) => setError(errorMessage(err, 'Could not load your workouts.')));
  }, []);

  const exercises = useMemo(() => [...new Set((workouts || []).map((w) => w.exercise))].sort(), [workouts]);
  const visible = (workouts || []).filter((w) => !filter || w.exercise === filter);

  const save = async (id, data) => {
    setBusy(true);
    setError('');
    try {
      const updated = await updateWorkout(id, data);
      setWorkouts((list) => list.map((w) => (w._id === id ? updated : w)));
      setEditing(null);
    } catch (err) {
      setError(errorMessage(err, 'Could not update the workout.'));
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id) => {
    setBusy(true);
    setError('');
    try {
      await deleteWorkout(id);
      setWorkouts((list) => list.filter((w) => w._id !== id));
      setConfirming(null);
    } catch (err) {
      setError(errorMessage(err, 'Could not delete the workout.'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white pt-24 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h1 className="text-3xl font-bold">My workouts</h1>
          <select
            aria-label="Filter by exercise"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-black border border-red-800 rounded p-2 text-sm"
          >
            <option value="">All exercises</option>
            {exercises.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        {error && <p role="alert" className="bg-red-950 border border-red-500 rounded p-3 mb-4">{error}</p>}
        {!workouts && !error && <p className="text-gray-400">Loading…</p>}
        {workouts && visible.length === 0 && (
          <p className="text-gray-400">
            Nothing here yet. <Link to="/logworkout" className="underline text-red-200">Log a workout</Link>
          </p>
        )}

        <ul className="space-y-3">
          {visible.map((w) => (
            <li key={w._id} className="bg-red-900 bg-opacity-20 border border-red-800 rounded-xl p-4">
              {editing === w._id ? (
                <WorkoutForm
                  initial={{ ...w, date: toDateInput(w.date) }}
                  submitLabel="Save changes"
                  busy={busy}
                  onSubmit={(data) => save(w._id, data)}
                />
              ) : (
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="font-semibold">{w.exercise}</p>
                    <p className="text-sm text-gray-300">{w.sets} sets × {w.reps} reps @ {w.weight} kg</p>
                    <p className="text-xs text-gray-400">{formatDate(w.date)}</p>
                    {w.notes && <p className="text-sm text-gray-300 mt-1 italic">“{w.notes}”</p>}
                  </div>
                  <div className="flex flex-col items-end gap-2 text-sm flex-shrink-0">
                    {confirming === w._id ? (
                      <>
                        <span className="text-red-200">Delete this workout?</span>
                        <div className="flex gap-2">
                          <button disabled={busy} onClick={() => remove(w._id)} className="bg-red-700 px-3 py-1 rounded">Yes, delete</button>
                          <button onClick={() => setConfirming(null)} className="border border-gray-500 px-3 py-1 rounded">Cancel</button>
                        </div>
                      </>
                    ) : (
                      <div className="flex gap-2">
                        <button onClick={() => { setEditing(w._id); setConfirming(null); }} className="border border-white px-3 py-1 rounded hover:bg-white hover:text-black">Edit</button>
                        <button onClick={() => setConfirming(w._id)} className="border border-red-500 text-red-300 px-3 py-1 rounded hover:bg-red-700 hover:text-white">Delete</button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {editing === w._id && (
                <button onClick={() => setEditing(null)} className="mt-2 text-sm underline text-gray-300">Cancel</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EditWorkout;
