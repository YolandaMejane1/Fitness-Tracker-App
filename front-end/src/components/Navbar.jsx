import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const menus = [
  { name: 'Home', path: '/home' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Log a Workout', path: '/logworkout' },
  { name: 'My Workouts', path: '/editworkout' },
  { name: 'Exercises', path: '/exercises' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    setOpen(false);
    navigate('/home');
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium uppercase px-3 py-2 rounded-3xl ${
      isActive ? 'bg-white text-red-800' : 'text-white hover:text-black'
    }`;

  const initial = (user?.name || user?.email || '?').charAt(0).toUpperCase();

  return (
    <header className="fixed left-0 right-0 z-50 bg-red-800 bg-opacity-95 py-3">
      <div className="flex justify-between items-center px-4 max-w-7xl mx-auto">
        <Link to="/home" className="text-white font-bold text-lg uppercase tracking-wide">
          Fitness <span className="text-red-800 border bg-white border-white px-1">Tracker</span>
        </Link>

        <button
          className="lg:hidden text-white"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
            <rect x="2" y="5" width="20" height="2.5" rx="1.2" />
            <rect x="2" y="11" width="20" height="2.5" rx="1.2" />
            <rect x="2" y="17" width="20" height="2.5" rx="1.2" />
          </svg>
        </button>

        <nav className="hidden lg:flex items-center gap-3">
          {menus.map((m) => (
            <NavLink key={m.path} to={m.path} className={linkClass}>{m.name}</NavLink>
          ))}
          {isAuthenticated ? (
            <>
              <span className="text-white text-sm ml-2">Hi, {user.name?.split(' ')[0] || 'there'}</span>
              {user.picture ? (
                <img src={user.picture} alt="" referrerPolicy="no-referrer" className="w-8 h-8 rounded-full border-2 border-white" />
              ) : (
                <span className="w-8 h-8 rounded-full border-2 border-white text-white text-sm flex items-center justify-center">{initial}</span>
              )}
              <button onClick={handleLogout} className="text-white text-sm border border-white px-3 py-1 rounded-full hover:bg-white hover:text-red-800">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="text-white text-sm border border-white px-3 py-1 rounded-full hover:bg-white hover:text-red-800">Register</Link>
              <Link to="/login" className="bg-white text-red-800 text-sm font-semibold px-5 py-1 rounded-full">Login</Link>
            </>
          )}
        </nav>
      </div>

      {open && (
        <div className="lg:hidden bg-red-800 text-white mt-2 px-4 pb-4 space-y-2">
          {menus.map((m) => (
            <NavLink key={m.path} to={m.path} onClick={() => setOpen(false)} className="block py-2 text-sm font-semibold uppercase">
              {m.name}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <button onClick={handleLogout} className="w-full bg-red-950 text-white p-2 rounded">Sign out</button>
          ) : (
            <div className="flex gap-2">
              <Link to="/signup" onClick={() => setOpen(false)} className="flex-1 border border-white text-center py-2 rounded-full text-sm">Register</Link>
              <Link to="/login" onClick={() => setOpen(false)} className="flex-1 bg-white text-red-800 text-center py-2 rounded-full text-sm font-semibold">Login</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
