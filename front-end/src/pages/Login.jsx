import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase"; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      navigate('/dashboard');
    } else {
      console.error("Please provide both email and password.");
    }
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then(() => navigate("/dashboard"))
      .catch((err) => console.error("Google Sign-In Error:", err));
  };

  return (
    <div className="container mx-auto max-w-md p-4 mt-10 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />
        <button type="submit" className="w-full bg-red-500 text-white p-2 rounded">
          Login
        </button>
      </form>

      <button
        onClick={handleGoogleLogin}
        className="w-full mt-4 bg-white text-gray-800 border border-gray-300 py-2 rounded hover:bg-gray-100"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default Login;
