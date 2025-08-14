import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "react-feather";
import logo from "../assets/logo.png";

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="bg-[#0a0e29] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo and brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" className="w-10 h-10" />
          <h1 className="text-xl font-bold text-[#00f3bb]">Financially Free</h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="/dashboard" className="hover:text-[#00f3bb]">Dashboard</a>
          <a href="/analytics" className="hover:text-[#00f3bb]">Analytics</a>
          <a href="/about" className="hover:text-[#00f3bb]">About</a>
        </nav>

    
        <div className="flex items-center gap-4">
          
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-[#00f3bb] text-[#0a0e29] px-4 py-1 rounded-md font-semibold hover:bg-[#7cfcdf] transition"
            >
              Logout
            </button>
          ) : (
            <User
              onClick={() => navigate("/login")}
              className="text-[#00f3bb] cursor-pointer hover:scale-110 transition"
            />
          )}
        </div>
      </div>
    </header>
  );
}



