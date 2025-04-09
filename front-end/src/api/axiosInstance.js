import axios from 'axios';
import { getToken } from '../services/authService';  

const axiosInstance = axios.create({
  baseURL: 'https://fitness-tracker-app-iuw4.onrender.com/api',
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
