import axiosInstance from './axiosInstance';

export const signUpRequest = async (payload) => (await axiosInstance.post('/auth/signup', payload)).data;
export const loginRequest = async (payload) => (await axiosInstance.post('/auth/login', payload)).data;
export const googleRequest = async (credential) => (await axiosInstance.post('/auth/google', { credential })).data;
export const meRequest = async () => (await axiosInstance.get('/auth/me')).data.user;
