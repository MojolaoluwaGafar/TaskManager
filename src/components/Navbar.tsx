import React from "react";
import { Link } from "react-router";

type NavbarProps = {
  title?: string;
};

const Navbar: React.FC<NavbarProps> = ({ title = "TaskManager" }) => {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-black text-white shadow">
      <h1 className="text-xl font-semibold tracking-wide">
        {title} <span>TM</span>
      </h1>

      <ul className="flex items-center gap-6 text-sm">
        <li>
          <Link to="/" className="cursor-pointer hover:opacity-70 transition">
            Home
          </Link>
        </li>
        <li>
          <Link to="/tasks" className="cursor-pointer hover:opacity-70 transition">
            Tasks
          </Link>
        </li>
        <li>
          <Link to="/profile" className="cursor-pointer hover:opacity-70 transition">
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;