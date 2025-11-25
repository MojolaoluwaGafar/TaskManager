import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

type User = {
  name: string;
  email: string;
  avatar?: string;
};

export default function Navbar({ title = "TaskManager" }: { title?: string }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/signin");
  };

  return (
    <nav className="w-full flex items-center justify-between px-8 py-8 bg-black text-white shadow">
      <h1 className="text-xl font-semibold tracking-wide">
        {title}
      </h1>

      <ul className="flex items-center gap-6 text-sm">
        {/* <li>
          <Link to="/" className="cursor-pointer hover:opacity-70 transition">
            Home
          </Link>
        </li> */}
        <li>
          <Link to="/" className="text-lg font-semibold cursor-pointer hover:opacity-70 transition">
            Tasks
          </Link>
        </li>
        {user ? (
          <>
            <li className="flex items-center gap-2">
              <img
                src={user.avatar || "https://via.placeholder.com/32"}
                alt="User Avatar"
                className="w-8 h-8 rounded-full object-cover bg-white"
              />
              <span className="font-semibold">{user.name}</span>
            </li>
            <div>
              <button
                onClick={handleLogout}
                className="px-3 py-2 bg-red-600 rounded hover:opacity-80"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/signin"
              className="px-3 py-2 border rounded hover:opacity-80"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-3 py-2 border rounded hover:opacity-80"
            >
              Sign Up
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}
