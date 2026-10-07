import React from 'react';

// Simple bar chart of weekly volume (no chart library needed).
const WeeklyChart = ({ weeks }) => {
  const max = Math.max(...weeks.map((w) => w.volume), 1);
  const label = (s) =>
    new Date(`${s}T00:00:00Z`).toLocaleDateString(undefined, { day: 'numeric', month: 'short', timeZone: 'UTC' });

  return (
    <div>
      <div className="flex items-end gap-2 h-40" role="img" aria-label="Weekly training volume for the last 8 weeks">
        {weeks.map((w) => (
          <div key={w.weekStart} className="flex-1 flex flex-col justify-end h-full" title={`${w.volume.toLocaleString()} kg across ${w.workouts} workouts`}>
            <div
              className="bg-red-600 rounded-t hover:bg-red-400 transition-colors"
              style={{ height: `${Math.max((w.volume / max) * 100, w.volume ? 4 : 1)}%` }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        {weeks.map((w) => (
          <span key={w.weekStart} className="flex-1 text-center text-xs text-gray-400">{label(w.weekStart)}</span>
        ))}
      </div>
    </div>
  );
};

export default WeeklyChart;
