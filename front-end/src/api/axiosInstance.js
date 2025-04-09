import axios from 'axios';
import { getToken } from '../services/authService';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5002/api',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
