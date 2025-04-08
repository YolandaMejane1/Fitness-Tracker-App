import React, { useState } from "react";

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

  return (
    <div>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-cover bg-center flex justify-center items-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1667781838690-5f32ea0ccea6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <div className="absolute inset-0 bg-black/60 z-0" />
          <div className="backdrop-blur  bg-black opacity-80 p-8 rounded-2xl max-w-sm w-[70%] sm:w-[50%] hover:text-center border border-red-800 text-white shadow-2xl">
            <h2 className="text-2xl mb-4 font-semibold">Sign Up</h2>
            {error && <p className="text-red-300 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 mb-4 border border-white bg-transparent text-white placeholder-white rounded"
                required
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-2 mb-4 border border-white bg-transparent text-white placeholder-white rounded"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full p-2 mb-4 border border-white bg-transparent text-white placeholder-white rounded"
                required
              />
              <button
                type="submit"
                className="w-full bg-red-800 hover:bg-red-900 text-white py-2 rounded font-semibold"
              >
                Sign Up
              </button>
            </form>

            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 text-white hover:underline ml-36"
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
