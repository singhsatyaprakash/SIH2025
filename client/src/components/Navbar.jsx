import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = ({ isLoggedIn }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Example: pull user type from localStorage (could be "tourist" or "authority")
  const userType = localStorage.getItem("userType");
  const profilePhotoUrl = "https://ui-avatars.com/api/?name=Tourist"; // Replace with actual user photo

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignIn = () => {
    navigate("/tourist/signin");
  };

  const handleDashboard = () => {
    if (userType === "tourist") {
      navigate("/tourist/dashboard");
    } else if (userType === "authority") {
      navigate("/authority/dashboard");
    } else {
      navigate("/"); // fallback
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    window.location.reload();
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md relative z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
        <span className="text-blue-600 font-bold text-xl">🛡️ SafeTour India</span>
      </div>

      {/* Menu */}
      <div className="hidden md:flex space-x-8" ref={menuRef}>
        <Link
          to="/#features"
          className="text-gray-700 hover:text-blue-600 font-medium transition"
        >
          Features
        </Link>
        <Link
          to="/about"
          className="text-gray-700 hover:text-blue-600 font-medium transition"
        >
          About
        </Link>

        {/* Tourists Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpenMenu(openMenu === "tourists" ? null : "tourists")}
            className="text-gray-700 hover:text-blue-600 font-medium transition"
          >
            For Tourists ▾
          </button>
          {openMenu === "tourists" && (
            <div className="absolute left-0 bg-white shadow-xl mt-2 rounded-lg w-56 py-2 z-50 animate-fadeIn">
              <Link to="/tourist/registration" className="block px-4 py-2 hover:bg-gray-100">
                Tourist Registration
              </Link>
              <Link to="/tourist/guide" className="block px-4 py-2 hover:bg-gray-100">
                Tourist Guide
              </Link>
            </div>
          )}
        </div>

        {/* New Stakeholders Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpenMenu(openMenu === "stakeholders" ? null : "stakeholders")}
            className="text-gray-700 hover:text-blue-600 font-medium transition"
          >
            For Stakeholders ▾
          </button>
          {openMenu === "stakeholders" && (
            <div className="absolute left-0 bg-white shadow-xl mt-2 rounded-lg w-56 py-2 z-50 animate-fadeIn">
              <Link to="/authority/signin?family" className="block px-4 py-2 hover:bg-gray-100">
                Family
              </Link>
              <Link to="/authority/signin?hotel" className="block px-4 py-2 hover:bg-gray-100">
                Hotel
              </Link>
              <Link to="/authority/signin?restaurant" className="block px-4 py-2 hover:bg-gray-100">
                Restaurant
              </Link>
              <Link to="/authority/signin?place" className="block px-4 py-2 hover:bg-gray-100">
                Tourist Place
              </Link>
            </div>
          )}
        </div>

        {/* Authorities Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpenMenu(openMenu === "authorities" ? null : "authorities")}
            className="text-gray-700 hover:text-blue-600 font-medium transition"
          >
            For Authorities ▾
          </button>
          {openMenu === "authorities" && (
            <div className="absolute left-0 bg-white shadow-xl mt-2 rounded-lg w-56 py-2 z-50 animate-fadeIn">
              <Link to="/authority/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                Authority Dashboard
              </Link>
              <Link to="/authority/reports" className="block px-4 py-2 hover:bg-gray-100">
                Reports
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Auth Buttons/Profile */}
      <div className="flex space-x-4 items-center">
        {!isLoggedIn ? (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        ) : (
          <>
            <img
              src={profilePhotoUrl}
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover border cursor-pointer"
              onClick={handleDashboard}
              title="Go to Dashboard"
            />
            <button
              className="text-gray-700 hover:text-red-600 font-medium transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
