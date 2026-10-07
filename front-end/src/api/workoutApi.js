import axiosInstance from './axiosInstance';

const BASE_URL = '/workouts';

export const createWorkout = async (data) => (await axiosInstance.post(BASE_URL, data)).data;
export const fetchWorkouts = async (params) => (await axiosInstance.get(BASE_URL, { params })).data;
export const fetchStats = async () => (await axiosInstance.get(`${BASE_URL}/stats`)).data;
export const getWorkoutById = async (id) => (await axiosInstance.get(`${BASE_URL}/${id}`)).data;
export const updateWorkout = async (id, data) => (await axiosInstance.put(`${BASE_URL}/${id}`, data)).data;
export const deleteWorkout = async (id) => (await axiosInstance.delete(`${BASE_URL}/${id}`)).data;
