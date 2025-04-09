import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance'; 
import { decodeToken } from '../services/authService'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (email && password) {
        const response = await axiosInstance.post('/auth/login', {
          email,
          password,
        });

        const { token } = response.data;
        localStorage.setItem('token', token);

        const decodedUser = decodeToken();
        if (decodedUser) {
          navigate('/dashboard');
        } else {
          setError('Invalid token');
        }
      } else {
        setError('Please provide both email and password.');
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await axiosInstance.post('/auth/google', {});
      const { token } = response.data;
      localStorage.setItem('token', token);

      const decodedUser = decodeToken();
      if (decodedUser) {
        navigate('/dashboard');
      } else {
        setError('Invalid token');
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-black flex items-center justify-center relative">
      <div className="absolute inset-0 bg-black opacity-90"></div>

      <div className="bg-red-800 p-8 rounded-xl shadow-2xl w-full max-w-md z-10 text-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-300 mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-2 bg-white text-black rounded focus:outline-none focus:ring-2 focus:ring-red-800"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 bg-white text-black rounded focus:outline-none focus:ring-2 focus:ring-red-800"
          />
          <button
            type="submit"
            className="w-full p-3 bg-red-900 text-white rounded hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-900"
          >
            Login
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
