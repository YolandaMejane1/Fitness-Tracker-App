import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createWorkout } from '../api/workoutApi';
import { errorMessage } from '../api/axiosInstance';
import WorkoutForm from '../components/WorkoutForm';

const LogWorkout = () => {
  const location = useLocation();
  const preset = new URLSearchParams(location.search).get('exercise') || '';
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(null);
  const [formKey, setFormKey] = useState(0);

  const handleSubmit = async (data) => {
    setBusy(true);
    setError('');
    try {
      const w = await createWorkout(data);
      setSaved(w);
      setFormKey((k) => k + 1); // reset the form, ready for the next set
    } catch (err) {
      setError(errorMessage(err, 'Could not save your workout.'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black pt-24 pb-12 px-4 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Log your workout</h1>
        <div className="bg-red-900 bg-opacity-30 border border-red-800 p-6 rounded-2xl">
          {saved && (
            <p role="status" className="bg-green-900 border border-green-500 text-green-100 text-sm rounded p-3 mb-4">
              Saved {saved.exercise}: {saved.sets}×{saved.reps} @ {saved.weight} kg.{' '}
              <Link to="/dashboard" className="underline">View dashboard</Link>
            </p>
          )}
          {error && <p role="alert" className="bg-red-950 border border-red-500 text-red-100 text-sm rounded p-3 mb-4">{error}</p>}
          <WorkoutForm key={formKey} initial={{ exercise: preset }} submitLabel="Log workout" onSubmit={handleSubmit} busy={busy} />
        </div>
      </div>
    </div>
  );
};

export default LogWorkout;
