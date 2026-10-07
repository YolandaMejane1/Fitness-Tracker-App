import React, { useState } from 'react';
import { EXERCISE_NAMES, today } from '../utils/exercises';

const input = 'w-full p-3 mt-1 bg-black bg-opacity-60 text-white border border-red-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600';

// Shared by "Log a Workout" and "Edit workout".
const WorkoutForm = ({ initial, submitLabel, onSubmit, busy }) => {
  const [form, setForm] = useState({
    exercise: initial?.exercise || '',
    reps: initial?.reps ?? '',
    sets: initial?.sets ?? '',
    weight: initial?.weight ?? '',
    date: initial?.date || today(),
    notes: initial?.notes || '',
  });
  const [error, setError] = useState('');

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const reps = Number(form.reps);
    const sets = Number(form.sets);
    const weight = Number(form.weight);
    if (!form.exercise) return setError('Choose an exercise.');
    if (!Number.isInteger(reps) || reps < 1) return setError('Reps must be a whole number of 1 or more.');
    if (!Number.isInteger(sets) || sets < 1) return setError('Sets must be a whole number of 1 or more.');
    if (!(weight >= 0)) return setError('Weight cannot be negative (use 0 for bodyweight).');
    setError('');
    onSubmit({ exercise: form.exercise, reps, sets, weight, date: form.date, notes: form.notes.trim() });
  };

  return (
    <form onSubmit={submit} noValidate className="text-white">
      {error && <p role="alert" className="bg-red-950 border border-red-500 text-sm rounded p-3 mb-4">{error}</p>}

      <label className="block text-sm mb-4" htmlFor="exercise">Exercise
        <select id="exercise" name="exercise" value={form.exercise} onChange={change} className={input}>
          <option value="">Select an exercise</option>
          {[...new Set([form.exercise, ...EXERCISE_NAMES].filter(Boolean))].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </label>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <label className="block text-sm" htmlFor="sets">Sets
          <input id="sets" name="sets" type="number" min="1" inputMode="numeric" value={form.sets} onChange={change} className={input} />
        </label>
        <label className="block text-sm" htmlFor="reps">Reps
          <input id="reps" name="reps" type="number" min="1" inputMode="numeric" value={form.reps} onChange={change} className={input} />
        </label>
        <label className="block text-sm" htmlFor="weight">Kg
          <input id="weight" name="weight" type="number" min="0" step="0.5" inputMode="decimal" value={form.weight} onChange={change} className={input} />
        </label>
      </div>

      <label className="block text-sm mb-4" htmlFor="date">Date
        <input id="date" name="date" type="date" max={today()} value={form.date} onChange={change} className={input} />
      </label>

      <label className="block text-sm mb-6" htmlFor="notes">Notes (optional)
        <textarea id="notes" name="notes" rows="2" maxLength="500" value={form.notes} onChange={change} className={input} placeholder="How did it feel?" />
      </label>

      <button type="submit" disabled={busy} className="w-full p-3 bg-red-700 hover:bg-red-600 disabled:opacity-60 rounded-md font-semibold">
        {busy ? 'Saving…' : submitLabel}
      </button>
    </form>
  );
};

export default WorkoutForm;
