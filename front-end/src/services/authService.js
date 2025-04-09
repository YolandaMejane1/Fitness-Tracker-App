import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "authToken";

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const decodeToken = () => {
  const token = getToken();
  if (!token) return null;
  return jwtDecode(token);
};

console.log(TOKEN_KEY);

export const logout = () => {
  removeToken();
};
