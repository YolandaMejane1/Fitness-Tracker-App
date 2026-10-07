import axios from 'axios';
import { getToken, logout } from '../services/authService';

// Set REACT_APP_API_URL in front-end/.env for local dev, e.g. http://localhost:5002/api
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://fitness-tracker-app-iuw4.onrender.com/api',
  timeout: 20000, // Render free tier can take a while to wake up
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// An expired or invalid token anywhere in the app signs the user out cleanly.
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    const url = error.config?.url || '';
    const isAuthCall = url.startsWith('/auth/login') || url.startsWith('/auth/signup') || url.startsWith('/auth/google');
    if (error.response?.status === 401 && !isAuthCall && getToken()) {
      logout();
      window.dispatchEvent(new Event('auth:expired'));
    }
    return Promise.reject(error);
  }
);

export const errorMessage = (error, fallback = 'Something went wrong. Please try again.') => {
  if (error.response?.data?.message) return error.response.data.message;
  if (error.code === 'ECONNABORTED' || !error.response) {
    return 'Cannot reach the server. It may be waking up — try again in a few seconds.';
  }
  return fallback;
};

export default axiosInstance;
