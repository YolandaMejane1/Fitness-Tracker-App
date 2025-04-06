import React, { useEffect, useState } from "react";
import axios from "../services/api";

const Progress = () => {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    axios.get("/progress").then((res) => setSummary(res.data));
  }, []);

  return (
    <div className="max-w-md mx-auto mt-20 text-red-600 font-light">
      <h2 className="text-3xl text-center mb-6">Your Progress</h2>
      <div className="space-y-4 text-lg">
        <p>Total Workouts: {summary.totalWorkouts}</p>
        <p>Total Volume Lifted: {summary.totalVolume} kg</p>
        <p>Max Weight: {summary.maxWeight} kg</p>
      </div>
    </div>
  );
};

export default Progress;
