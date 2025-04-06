import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    if (email && password) {
      navigate('/login');
    } else {
      console.error("Please provide both email and password.");
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold">Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-2"
        />
        <button type="submit" className="bg-red-500 text-white p-2">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
