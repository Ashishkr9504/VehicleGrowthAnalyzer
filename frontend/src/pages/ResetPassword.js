import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/user/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Password reset successful!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(data.message || "Reset failed.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="bg-[#0a0e29] text-white min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="bg-gradient-to-br from-[#1a1e3f] to-[#0a0e29] rounded-2xl shadow-[0_8px_30px_rgba(0,243,187,0.2)] p-10 w-full max-w-md text-white border border-[#00f3bb]/30 transition-transform hover:scale-[1.02] duration-300">
          <h2 className="text-3xl font-bold text-center text-[#00f3bb] mb-6">
            Reset Your Password
          </h2>

          <form className="space-y-5" onSubmit={handleReset}>
            <div>
              <label className="block mb-1 font-semibold">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-[#0a0e29] border border-[#00f3bb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00f3bb] text-white placeholder-gray-400 hover:ring-2 hover:ring-[#5ea14c] transition"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-[#0a0e29] border border-[#00f3bb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00f3bb] text-white placeholder-gray-400 hover:ring-2 hover:ring-[#5ea14c] transition"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#00f3bb] to-[#7cfcdf] text-[#0a0e29] font-bold py-2 rounded-lg shadow-md hover:scale-105 transition"
            >
              Reset Password
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
