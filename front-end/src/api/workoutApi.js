import axiosInstance from './axiosInstance';

const BASE_URL = '/workouts';

export const createWorkout = async (workoutData) => {
  const { data } = await axiosInstance.post(BASE_URL, { workoutData });
  return data;
};

export const fetchWorkouts = async () => {
  const { data } = await axiosInstance.get(BASE_URL);
  return data;
};

export const getWorkoutById = async (workoutId) => {
  const { data } = await axiosInstance.get(`${BASE_URL}/${workoutId}`);
  return data;
};

export const updateWorkout = async (workoutId, updatedWorkout) => {
  const { data } = await axiosInstance.patch(`${BASE_URL}/${workoutId}`, updatedWorkout);
  return data;
};

export const deleteWorkout = async (workoutId) => {
  const { data } = await axiosInstance.delete(`${BASE_URL}/${workoutId}`);
  return data;
};
