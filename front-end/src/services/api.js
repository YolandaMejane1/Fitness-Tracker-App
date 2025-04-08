import axios from 'axios';
import { auth } from '../firebase';  

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: false,
  timeout: 5000,
});

const getFirebaseToken = async () => {
  const user = auth.currentUser;  
  if (user) {
    try {
      return await user.getIdToken();
    } catch (error) {
      console.error("Error fetching Firebase ID token:", error.message);
      throw new Error("Error fetching Firebase ID token");
    }
  } else {
    throw new Error('User is not authenticated');
  }
};

API.interceptors.request.use(
  async (config) => {
    try {
      const token = await getFirebaseToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn("No token found. Request will be unauthenticated.");
      }
    } catch (error) {
      console.error('Error fetching token:', error.message);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getWorkouts = () => API.get('/workouts');
export const addWorkout = (data) => API.post('/workouts', data);
export const updateWorkout = (id, data) => API.put(`/workouts/${id}`, data);
export const deleteWorkout = (id) => API.delete(`/workouts/${id}`);
export const getProgress = () => API.get('/progress');
