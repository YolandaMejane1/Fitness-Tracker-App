import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchStats, fetchWorkouts } from '../api/workoutApi';
import { errorMessage } from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import WeeklyChart from '../components/WeeklyChart';
import { formatDate, formatKg } from '../utils/exercises';

const Card = ({ label, value, hint }) => (
  <div className="bg-red-900 bg-opacity-30 border border-red-800 rounded-2xl p-5 text-center">
    <p className="text-xs uppercase tracking-wider text-red-200">{label}</p>
    <p className="text-3xl font-bold mt-1">{value}</p>
    {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchStats(), fetchWorkouts()])
      .then(([s, all]) => {
        if (cancelled) return;
        setStats(s);
        setRecent(all.slice(0, 5));
      })
      .catch((err) => !cancelled && setError(errorMessage(err, 'Could not load your stats.')));
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Hi, {user?.name?.split(' ')[0] || 'athlete'} 👋</h1>
            <p className="text-gray-400">Here’s how your training is going.</p>
          </div>
          <Link to="/logworkout" className="bg-red-700 hover:bg-red-600 px-5 py-2 rounded-full font-semibold text-center">
            + Log a workout
          </Link>
        </div>

        {error && <p role="alert" className="bg-red-950 border border-red-500 rounded p-3 mb-6">{error}</p>}
        {!stats && !error && <p className="text-gray-400">Loading your stats…</p>}

        {stats && stats.totalWorkouts === 0 && (
          <div className="border border-dashed border-red-800 rounded-2xl p-10 text-center">
            <p className="text-xl font-semibold mb-2">No workouts yet</p>
            <p className="text-gray-400 mb-4">Log your first session and your stats will show up here.</p>
            <Link to="/logworkout" className="inline-block bg-red-700 px-5 py-2 rounded-full">Log your first workout</Link>
          </div>
        )}

        {stats && stats.totalWorkouts > 0 && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card label="Workouts" value={stats.totalWorkouts} />
              <Card label="Day streak" value={`${stats.streak} 🔥`} hint="consecutive days" />
              <Card label="Total volume" value={formatKg(stats.totalVolume)} hint="reps × sets × weight" />
              <Card label="Heaviest lift" value={formatKg(stats.maxWeight)} hint={stats.favouriteExercise && `Most logged: ${stats.favouriteExercise}`} />
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mt-6">
              <section className="lg:col-span-2 bg-red-900 bg-opacity-20 border border-red-800 rounded-2xl p-5">
                <h2 className="font-semibold mb-4">Weekly volume (kg)</h2>
                <WeeklyChart weeks={stats.weekly} />
              </section>

              <section className="bg-red-900 bg-opacity-20 border border-red-800 rounded-2xl p-5">
                <h2 className="font-semibold mb-4">Personal records</h2>
                <ul className="space-y-3">
                  {stats.records.map((r) => (
                    <li key={r.exercise} className="flex justify-between text-sm">
                      <span>
                        {r.exercise}
                        <span className="block text-xs text-gray-400">est. 1RM {r.estimated1RM} kg</span>
                      </span>
                      <span className="font-semibold">{r.weight} kg × {r.reps}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="mt-6 bg-red-900 bg-opacity-20 border border-red-800 rounded-2xl p-5">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold">Recent workouts</h2>
                <Link to="/editworkout" className="text-sm underline text-red-200">See all</Link>
              </div>
              <ul className="divide-y divide-red-900">
                {recent.map((w) => (
                  <li key={w._id} className="py-2 flex justify-between text-sm">
                    <span>{w.exercise} <span className="text-gray-400">· {w.sets}×{w.reps} @ {w.weight} kg</span></span>
                    <span className="text-gray-400">{formatDate(w.date)}</span>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
