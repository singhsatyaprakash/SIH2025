import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const TouristSignIn = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign In Submitted:", formData);
    // TODO: connect with backend login API
    navigate('/tourist/dashboard')
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50 relative p-4">
        <div className="relative bg-white/80 shadow-xl rounded-2xl p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Tourist Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Identifier */}
            <div>
              <label className="block mb-1 font-medium">
                Email / Passport / Aadhaar <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="identifier"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email, passport or Aadhaar"
                value={formData.identifier}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-medium">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Forgot password */}
            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-blue-600 hover:underline text-sm"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
            >
              Sign In
            </button>

            {/* Sign up link */}
            <p className="text-center mt-3 text-gray-700">
              Not a user yet?{" "}
              <a
                href="/tourist/register"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TouristSignIn;
