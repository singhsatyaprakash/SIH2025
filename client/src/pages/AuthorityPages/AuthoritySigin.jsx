import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const AuthoritySigin = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add real authentication here
    navigate("/authority/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1023] via-[#181f3a] to-[#232c50] flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-[#181f3a]/90 rounded-2xl shadow-2xl p-10 w-full max-w-md border border-[#232c50]">
          <h2 className="text-3xl font-extrabold text-blue-300 mb-6 text-center tracking-wide drop-shadow">
            Authority Sign In
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-blue-200 mb-1 font-semibold">Authority ID</label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#232c50] text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter your Authority ID"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="block text-blue-200 mb-1 font-semibold">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#232c50] text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold py-2.5 rounded-lg shadow-lg transition text-lg tracking-wide"
            >
              Sign In
            </button>
          </form>
          <div className="flex justify-between items-center mt-6">
            <button
              className="text-xs text-blue-300 hover:underline"
              onClick={() => setShowForgot(true)}
              type="button"
            >
              Forgot password?
            </button>
            <span className="text-xs text-blue-200">
              Not an authority?{" "}
              <a href="/" className="underline hover:text-blue-400 transition">
                Go Home
              </a>
            </span>
          </div>
          {showForgot && (
            <div className="mt-5 bg-blue-900/80 text-blue-100 p-3 rounded-lg text-center shadow">
              Please contact your admin to reset your password.
            </div>
          )}
        </div>
      </div>
      <footer className="w-full py-4 text-center text-blue-200 bg-[#10173a] mt-auto border-t border-[#232c50] shadow-inner">
        &copy; {new Date().getFullYear()} Northeast India Tourism Monitoring System
      </footer>
    </div>
  );
};

export default AuthoritySigin;