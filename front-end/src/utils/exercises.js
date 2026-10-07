export const EXERCISE_NAMES = [
  'Push-Up', 'Squat', 'Deadlift', 'Bench Press', 'Pull-Up', 'Lunges', 'Plank', 'Bicep Curl',
  'Tricep Dip', 'Shoulder Press', 'Pilates', 'Mountain Climbers', 'Leg Press', 'Calf Raise',
  'Lat Pulldown', 'Leg Curl',
];

export const today = () => new Date().toISOString().slice(0, 10);
export const toDateInput = (d) => new Date(d).toISOString().slice(0, 10);
export const formatDate = (d) =>
  new Date(d).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
export const formatKg = (n) => `${Number(n || 0).toLocaleString()} kg`;
