import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'token';

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);
export const logout = removeToken;

// Returns the token's payload, or null if there is no token / it is invalid / expired.
export const decodeToken = () => {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = jwtDecode(token);
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      removeToken();
      return null;
    }
    return payload;
  } catch {
    removeToken();
    return null;
  }
};
