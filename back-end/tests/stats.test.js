import test from 'node:test';
import assert from 'node:assert/strict';
import { buildStats, currentStreak, weeklyVolume, personalRecords, estimate1RM } from '../utils/stats.js';

const now = new Date('2026-10-07T10:00:00Z'); // a Wednesday
const w = (date, exercise, reps, sets, weight) => ({ date, exercise, reps, sets, weight });

test('volume = reps x sets x weight', () => {
  const s = buildStats([w('2026-10-07', 'Squat', 5, 3, 100)], now);
  assert.equal(s.totalVolume, 1500);
  assert.equal(s.maxWeight, 100);
  assert.equal(s.totalWorkouts, 1);
});

test('empty history gives zeros, not NaN/-Infinity', () => {
  const s = buildStats([], now);
  assert.equal(s.maxWeight, 0);
  assert.equal(s.streak, 0);
  assert.equal(s.favouriteExercise, null);
  assert.equal(s.weekly.length, 8);
});

test('streak counts consecutive days and survives "not yet today"', () => {
  const days = ['2026-10-06', '2026-10-05', '2026-10-04'].map((d) => w(d, 'Plank', 1, 1, 0));
  assert.equal(currentStreak(days, now), 3);
  assert.equal(currentStreak([...days, w('2026-10-07', 'Plank', 1, 1, 0)], now), 4);
  assert.equal(currentStreak([w('2026-10-01', 'Plank', 1, 1, 0)], now), 0);
});

test('weekly buckets start on Monday and ignore old/future entries', () => {
  const rows = [
    w('2026-10-05', 'Squat', 10, 1, 10), // Monday this week
    w('2026-10-07', 'Squat', 10, 1, 10),
    w('2026-09-30', 'Squat', 10, 1, 10), // last week
    w('2025-01-01', 'Squat', 10, 1, 10), // too old
    w('2026-10-20', 'Squat', 10, 1, 10), // future
  ];
  const weeks = weeklyVolume(rows, 8, now);
  assert.equal(weeks.at(-1).weekStart, '2026-10-05');
  assert.equal(weeks.at(-1).volume, 200);
  assert.equal(weeks.at(-2).volume, 100);
  assert.equal(weeks.reduce((a, b) => a + b.volume, 0), 300);
});

test('personal records keep the heaviest lift per exercise', () => {
  const recs = personalRecords([
    w('2026-10-01', 'Squat', 5, 3, 80),
    w('2026-10-02', 'Squat', 3, 3, 100),
    w('2026-10-02', 'Curl', 10, 3, 15),
  ]);
  assert.equal(recs[0].exercise, 'Squat');
  assert.equal(recs[0].weight, 100);
  assert.equal(recs.length, 2);
});

test('estimated 1RM', () => {
  assert.equal(estimate1RM(100, 1), 100);
  assert.equal(estimate1RM(100, 5), 116.7);
});
