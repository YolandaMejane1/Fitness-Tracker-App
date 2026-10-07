import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { decodeToken, logout as clearToken, setToken } from '../services/authService';
import { loginRequest, signUpRequest, googleRequest, meRequest } from '../api/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On first load: if there is a valid token, ask the server who we are.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (decodeToken()) {
        try {
          const me = await meRequest();
          if (!cancelled) setUser(me);
        } catch (err) {
          // Only a rejected token should sign out; a sleeping server should not.
          if (err.response?.status === 401) clearToken();
        }
      }
      if (!cancelled) setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  const signOut = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  useEffect(() => {
    window.addEventListener('auth:expired', signOut);
    return () => window.removeEventListener('auth:expired', signOut);
  }, [signOut]);

  const start = useCallback(async (request) => {
    const { token, user: u } = await request;
    setToken(token);
    setUser(u);
    return u;
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      login: (creds) => start(loginRequest(creds)),
      signUp: (data) => start(signUpRequest(data)),
      loginWithGoogle: (credential) => start(googleRequest(credential)),
      signOut,
    }),
    [user, loading, start, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
