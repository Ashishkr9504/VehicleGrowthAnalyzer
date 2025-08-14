// import React from "react";
// export default function LoginPage() {
//   return (
//     <div className="bg-[#0a0e29] text-white min-h-screen flex flex-col">
      
//       <main className="flex-grow flex items-center justify-center px-4">
//         <div className="bg-gradient-to-br from-[#1a1e3f] to-[#0a0e29] rounded-2xl shadow-[0_8px_30px_rgba(0,243,187,0.2)] p-10 w-full max-w-md text-white border border-[#00f3bb]/30 transition-transform hover:scale-[1.02] duration-300">
//           <h2 className="text-3xl font-bold text-center text-[#00f3bb] mb-6">Login to Your Account</h2>
//           <form className="space-y-5">
//             <div>
//               <label className="block mb-1 font-semibold">Email</label>
//               <input
//                 type="email"
//                 className="w-full px-4 py-2 bg-[#0a0e29] border border-[#00f3bb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00f3bb] text-white placeholder-gray-400 hover:ring-2 hover:ring-[#5ea14c] transition"
//                 placeholder="Enter your email"
//               />
//             </div>
//             <div>
//               <label className="block mb-1 font-semibold">Password</label>
//               <input
//                 type="password"
//                 className="w-full px-4 py-2 bg-[#0a0e29] border border-[#00f3bb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00f3bb] text-white placeholder-gray-400 hover:ring-2 hover:ring-[#5ea14c] transition"
//                 placeholder="Enter your password"
//               />
//             </div>
//             <div className="flex justify-between items-center text-sm">
//               <a href="/forgot" className="text-[#5ea14c] hover:underline">Forgot password?</a>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-[#00f3bb] to-[#7cfcdf] text-[#0a0e29] font-bold py-2 rounded-lg shadow-md hover:scale-105 transition"
//             >
//               Login
//             </button>
//           </form>
//           <p className="mt-6 text-sm text-center">
//             Don’t have an account?{' '}
//             <a href="/signup" className="text-[#5ea14c] hover:underline">Create one</a>
//           </p>
//         </div>
//       </main>
      
//     </div>
//   );
// }
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
export default function LoginPage() {
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("isLoggedIn", "true");
        toast.success("Login successful!");
        navigate("/home");
      } else {
        toast.error(data.message || "Login failed");
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
          <h2 className="text-3xl font-bold text-center text-[#00f3bb] mb-6">Login to Your Account</h2>
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block mb-1 font-semibold">Email</label>
              <input type="email" className="w-full px-4 py-2 bg-[#0a0e29] border border-[#00f3bb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00f3bb] text-white placeholder-gray-400 hover:ring-2 hover:ring-[#5ea14c] transition" placeholder="Enter your email" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Password</label>
              <input type="password" className="w-full px-4 py-2 bg-[#0a0e29] border border-[#00f3bb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00f3bb] text-white placeholder-gray-400 hover:ring-2 hover:ring-[#5ea14c] transition" placeholder="Enter your password" />
            </div>
            <div className="flex justify-between items-center text-sm">
              <a href="/forgot" className="text-[#5ea14c] hover:underline">Forgot password?</a>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-[#00f3bb] to-[#7cfcdf] text-[#0a0e29] font-bold py-2 rounded-lg shadow-md hover:scale-105 transition">Login</button>
          </form>
          <p className="mt-6 text-sm text-center">
            Don’t have an account?{' '}
            <a href="/signup" className="text-[#5ea14c] hover:underline">Create one</a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}


