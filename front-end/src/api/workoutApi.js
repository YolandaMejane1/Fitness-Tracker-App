import axios from 'axios';

const BASE_URL = 'http://localhost:5002/api/workouts';

export const createWorkout = async (workout) => {
  const { data } = await axios.post(BASE_URL, workout);
  return data;
};

export const fetchWorkouts = async () => {
  const { data } = await axios.get(BASE_URL);
  return data;
};

export const getWorkoutById = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/${id}`);
  return data;
};

export const updateWorkout = async (id, updatedWorkout) => {
  const { data } = await axios.patch(`${BASE_URL}/${id}`, updatedWorkout);
  return data;
};

export const deleteWorkout = async (id) => {
  const { data } = await axios.delete(`${BASE_URL}/${id}`);
  return data;
};
