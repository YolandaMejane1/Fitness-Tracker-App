import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase"; 

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    alert("User signed up successfully!");
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    }
  };

  const handleGoogleSignUp = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        alert("Signed up with Google!");
        setIsModalOpen(false);
      })
      .catch((err) => console.error("Google Sign-Up Error:", err));
  };

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg max-w-sm w-full text-center text-red-600">
            <h2 className="text-2xl mb-4">Sign Up</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 mb-4 border border-red-600 rounded"
                required
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-2 mb-4 border border-red-600 rounded"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full p-2 mb-4 border border-red-600 rounded"
                required
              />
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 rounded"
              >
                Sign Up
              </button>
            </form>

            <button
              onClick={handleGoogleSignUp}
              className="w-full mt-4 bg-white text-gray-800 border border-gray-300 py-2 rounded hover:bg-gray-100"
            >
              Continue with Google
            </button>

            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 text-gray-600 hover:text-gray-900"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
