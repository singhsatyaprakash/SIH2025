import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaCamera } from "react-icons/fa";
import noProfile from "../../assets/noProfile.png"; // <-- Import the image

const TouristProfile = () => {
  // Static profile data (replace with backend fetch later)
  const touristData = {
    firstName: "Satya",
    lastName: "Singh",
    email: "satya@example.com",
    passportNumber: "M1234567",
    aadhaarNumber: "1234-5678-9876",
    emergencyContact: [
      { name: "Raj", number: "+91 9876543210" },
      { name: "Amit", number: "+91 9123456789" },
    ],
  };

  // Profile photo state
  const [profilePhoto, setProfilePhoto] = useState(null);

  // Handle photo upload
  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Check login status (replace with real logic)
  const isLoggedIn = Boolean(localStorage.getItem("touristToken"));

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      {/* Navbar */}
      <Navbar isLoggedIn={isLoggedIn} />

      {/* Profile Content */}
      <main className="flex-grow flex justify-center items-center p-6">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full text-center">
          <h2 className="text-2xl font-bold mb-6 text-indigo-700">
            Tourist Profile
          </h2>

          {/* Profile Photo with Edit Option */}
          <div className="relative w-32 h-32 mx-auto mb-6">
            <img
              src={
                profilePhoto ||
                noProfile // <-- Use local asset if no uploaded image
              }
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border-4 border-indigo-200 shadow-md"
            />
            <label
              htmlFor="photoUpload"
              className="absolute bottom-2 right-2 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 shadow-lg"
            >
              <FaCamera />
            </label>
            <input
              id="photoUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </div>

          {/* Tourist Details */}
          <div className="text-left space-y-4">
            <p>
              <strong>First Name:</strong> {touristData.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {touristData.lastName}
            </p>
            <p>
              <strong>Email:</strong> {touristData.email}
            </p>
            <p>
              <strong>Passport Number:</strong> {touristData.passportNumber}
            </p>
            <p>
              <strong>Aadhaar Number:</strong> {touristData.aadhaarNumber}
            </p>
            <div>
              <strong>Emergency Contacts:</strong>
              <ul className="list-disc list-inside">
                {touristData.emergencyContact.map((c, index) => (
                  <li key={index}>
                    {c.name} - {c.number}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
export default TouristProfile;