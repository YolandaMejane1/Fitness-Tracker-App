import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="bg-red-500 p-4">
      <ul className="flex justify-between">
        <li>
          <Link to="/" className="text-white">Home</Link>
        </li>
        <li>
          {user ? (
            <Link to="/dashboard" className="text-white">Dashboard</Link>
          ) : (
            <Link to="/login" className="text-white">Login</Link>
          )}
        </li>
        <li>
          {user ? (
            
            <button className="text-white">Logout</button>
          ) : (
            <Link to="/signup" className="text-white">Sign Up</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
