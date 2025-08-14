
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

export default function SignupPage() {
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await fetch("http://localhost:5000/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("User created successfully!");
        navigate("/login");
      } else {
        toast.error(data.message || "Signup failed");
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
          <h2 className="text-3xl font-bold text-center text-[#00f3bb] mb-6">Create an Account</h2>
          <form className="space-y-5" onSubmit={handleSignup}>
            <div>
              <label className="block mb-1 font-semibold">Full Name</label>
              <input type="text" className="w-full px-4 py-2 bg-[#0a0e29] border border-[#00f3bb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00f3bb] text-white placeholder-gray-400 hover:ring-2 hover:ring-[#5ea14c] transition" placeholder="Enter your full name" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Email</label>
              <input type="email" className="w-full px-4 py-2 bg-[#0a0e29] border border-[#00f3bb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00f3bb] text-white placeholder-gray-400 hover:ring-2 hover:ring-[#5ea14c] transition" placeholder="Enter your email" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Password</label>
              <input type="password" className="w-full px-4 py-2 bg-[#0a0e29] border border-[#00f3bb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00f3bb] text-white placeholder-gray-400 hover:ring-2 hover:ring-[#5ea14c] transition" placeholder="Create a password" />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-[#00f3bb] to-[#7cfcdf] text-[#0a0e29] font-bold py-2 rounded-lg shadow-md hover:scale-105 transition">Sign Up</button>
          </form>
          <p className="mt-6 text-sm text-center">
            Already have an account?{' '}
            <a href="/login" className="text-[#5ea14c] hover:underline">Login here</a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
