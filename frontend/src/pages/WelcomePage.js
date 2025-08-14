import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-[#0a0e29] text-white text-center">
      <div>
        <img src={logo} alt="Financially Free Logo" className="mx-auto mb-20 w-100" />
        <h1 className="text-4xl font-bold mb-6 text-[#00f3bb]">Welcome to Financially Free</h1>
        <button
          onClick={() => navigate("/home")}
          className="bg-[#00f3bb] text-[#0a0e29] font-semibold px-8 py-4 rounded shadow-lg hover:bg-[#7cfcdf] transition transform hover:scale-105 duration-300"
        >
          Demo Project
        </button>
      </div>
    </div>
  );
}