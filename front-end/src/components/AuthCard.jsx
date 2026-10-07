import React from 'react';

// Shared layout for Login / SignUp so they look identical.
const AuthCard = ({ title, subtitle, error, children, footer }) => (
  <div className="min-h-screen w-full bg-black flex items-center justify-center px-4 pt-20 pb-10">
    <div className="bg-red-900 bg-opacity-40 border border-red-800 p-8 rounded-2xl shadow-2xl w-full max-w-md text-white">
      <h1 className="text-3xl font-bold text-center">{title}</h1>
      <p className="text-center text-sm text-red-200 mt-1 mb-6">{subtitle}</p>
      {error && (
        <p role="alert" className="bg-red-950 border border-red-500 text-red-100 text-sm rounded p-3 mb-4">
          {error}
        </p>
      )}
      {children}
      <div className="mt-6 text-center text-sm text-red-100">{footer}</div>
    </div>
  </div>
);

export const Field = ({ label, id, ...props }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm mb-1 text-red-100">{label}</label>
    <input
      id={id}
      name={id}
      {...props}
      className="w-full p-3 bg-black bg-opacity-60 border border-red-800 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
    />
  </div>
);

export const PrimaryButton = ({ loading, children, ...props }) => (
  <button
    {...props}
    disabled={loading || props.disabled}
    className="w-full p-3 bg-red-700 hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded transition"
  >
    {loading ? 'Please wait…' : children}
  </button>
);

export default AuthCard;
