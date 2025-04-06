import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const getWorkouts = () => API.get('/workouts');

export const addWorkout = (data) => API.post('/workouts', data);

export const updateWorkout = (id, data) => API.put(`/workouts/${id}`, data);

export const deleteWorkout = (id) => API.delete(`/workouts/${id}`);

export const getProgress = () => API.get('/progress');
