// Pure helpers: build dashboard stats from a list of workouts.
const DAY = 86400000;

const dayKey = (d) => new Date(d).toISOString().slice(0, 10);
const toUtcDay = (key) => Date.parse(`${key}T00:00:00Z`);

export const volumeOf = (w) => (w.reps || 0) * (w.sets || 1) * (w.weight || 0);

// Epley estimate of one-rep max.
export const estimate1RM = (weight, reps) =>
  reps <= 1 ? weight : Math.round(weight * (1 + reps / 30) * 10) / 10;

// Consecutive-day streak ending today (or yesterday, so it doesn't reset mid-day).
export const currentStreak = (workouts, now = new Date()) => {
  const days = new Set(workouts.map((w) => dayKey(w.date)));
  let cursor = toUtcDay(dayKey(now));
  if (!days.has(dayKey(cursor))) cursor -= DAY;
  let streak = 0;
  while (days.has(dayKey(cursor))) {
    streak += 1;
    cursor -= DAY;
  }
  return streak;
};

// Volume per week for the last `weeks` weeks (oldest first). Weeks start on Monday.
export const weeklyVolume = (workouts, weeks = 8, now = new Date()) => {
  const today = toUtcDay(dayKey(now));
  const mondayOffset = (new Date(today).getUTCDay() + 6) % 7;
  const thisMonday = today - mondayOffset * DAY;
  const buckets = [];
  for (let i = weeks - 1; i >= 0; i -= 1) {
    buckets.push({ weekStart: dayKey(thisMonday - i * 7 * DAY), volume: 0, workouts: 0 });
  }
  const first = toUtcDay(buckets[0].weekStart);
  workouts.forEach((w) => {
    const t = toUtcDay(dayKey(w.date));
    if (t < first || t > today) return;
    const idx = Math.floor((t - first) / (7 * DAY));
    buckets[idx].volume += volumeOf(w);
    buckets[idx].workouts += 1;
  });
  return buckets;
};

export const personalRecords = (workouts) => {
  const best = new Map();
  workouts.forEach((w) => {
    const current = best.get(w.exercise);
    if (!current || w.weight > current.weight) {
      best.set(w.exercise, {
        exercise: w.exercise,
        weight: w.weight,
        reps: w.reps,
        date: w.date,
        estimated1RM: estimate1RM(w.weight, w.reps),
      });
    }
  });
  return [...best.values()].sort((a, b) => b.weight - a.weight);
};

export const buildStats = (workouts, now = new Date()) => ({
  totalWorkouts: workouts.length,
  totalVolume: workouts.reduce((acc, w) => acc + volumeOf(w), 0),
  maxWeight: workouts.reduce((m, w) => Math.max(m, w.weight || 0), 0),
  streak: currentStreak(workouts, now),
  weekly: weeklyVolume(workouts, 8, now),
  records: personalRecords(workouts).slice(0, 5),
  favouriteExercise: (() => {
    const counts = {};
    workouts.forEach((w) => { counts[w.exercise] = (counts[w.exercise] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
  })(),
});
