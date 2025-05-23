import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getToken, logout } from "../services/authService";
import { decodeToken } from "../services/authService";

const menus = [
  { name: "Home", path: "/home" },
  { name: "Stats", path: "/dashboard" },
  { name: "Log a Workout", path: "/logworkout" },
  { name: "Exercise Types", path: "/exercises" },
];

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setToggleMenu(false);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/home");
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = decodeToken();
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token:", err);
        logout();
      }
    }
  }, []);

  return (
    <header className="fixed left-0 right-0 z-50 bg-red-800 bg-opacity-95 py-4">
      <div className="flex justify-between items-center px-4 max-w-7xl mx-auto">
        <Link
          to="/home"
          className="text-white font-bold text-lg uppercase tracking-wide"
        >
          Fitness{" "}
          <span className="text-red-800 border bg-white border-white px-1">
            Tracker
          </span>
        </Link>

        <div className="sm:hidden">
          <button onClick={() => setToggleMenu(!toggleMenu)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 246.42 246.04"
              className="fill-white w-8 h-8 text-white"
            >
              <rect x="0.79" y="30.22" width="245.63" height="23.36" rx="11.68" />
              <rect x="0.39" y="111.32" width="245.63" height="23.36" rx="11.68" />
              <rect y="192.42" width="245.63" height="23.36" rx="11.68" />
            </svg>
          </button>
        </div>

        <nav className="hidden sm:flex items-center gap-8">
          {menus.map((menu, i) => (
            <Link
              key={i}
              to={menu.path}
              className={`text-white text-sm font-medium uppercase hover:text-black px-3 py-2 rounded-3xl ${
                location.pathname === menu.path ? "bg-white text-red-800" : ""
              }`}
            >
              {menu.name}
            </Link>
          ))}

          {!user ? (
            <>
              <Link
                to="/signup"
                className="text-white text-sm hover:underline border border-white px-3 py-1 rounded-full"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="text-white text-sm border border-white px-5 py-1 rounded-full"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <span className="text-white text-sm mr-0">
                Welcome, {user.name || "User"}
              </span>
              <img
                src="/default-avatar.png"
                alt="User profile"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <button
                onClick={handleLogout}
                className="ml-0 text-white text-sm border border-white px-3 py-1 rounded-full"
              >
                Sign Out
              </button>
            </>
          )}
        </nav>
      </div>

      {toggleMenu && (
        <div className="sm:hidden bg-red-800 text-white mt-2 px-4 pb-4 rounded-b-xl space-y-3">
          {menus.map((menu, i) => (
            <Link
              key={i}
              to={menu.path}
              onClick={handleMenuClick}
              className="block py-1 text-sm font-semibold uppercase hover:text-yellow-300"
            >
              {menu.name}
            </Link>
          ))}

          {!user ? (
            <>
              <Link
                to="/signup"
                onClick={handleMenuClick}
                className="text-sm hover:underline border border-white px-3 py-1 rounded-full block text-center"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                onClick={handleMenuClick}
                className="w-full bg-white text-red-800 p-2 rounded-full block text-center"
              >
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white p-2 rounded"
            >
              Sign Out
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
