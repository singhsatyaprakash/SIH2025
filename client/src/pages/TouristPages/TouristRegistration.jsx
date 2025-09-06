import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import worldImg from "../../assets/world.png";

export default function RegisterTourist() {
  const [contacts, setContacts] = useState([{ name: "", number: "" }]);
  const [idType, setIdType] = useState("passport");
  const navigate = useNavigate();

  const addContact = () => {
    if (contacts.length < 3) {
      setContacts([...contacts, { name: "", number: "" }]);
    }
  };

  const handleContactChange = (index, field, value) => {
    const updated = [...contacts];
    updated[index][field] = value;
    setContacts(updated);
  };

const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    passport: "",
    aadhaar: "",
    password: "",
    confirmPassword: "",
  });

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (
      contacts.filter((c) => c.name.trim() !== "" && c.number.trim() !== "")
        .length < 1
    ) {
      alert("Please provide at least one complete emergency contact.");
      return;
    }

    // Prepare data to send
    const dataToSend = {
      ...formData,
      contacts,
      idType,
      idValue: idType === "passport" ? formData.passport : formData.aadhaar,
    };

    console.log("Form Submitted:", dataToSend);

    // Navigate to /tourists/signin after registration
    navigate("/tourist/signin");
  };

  return (
    <>
      <Navbar />
      <div
        className="flex justify-center items-center min-h-screen bg-cover bg-center relative p-4"
        style={{
          backgroundImage: `url(${worldImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative bg-white/70 shadow-xl rounded-2xl p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Tourist Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First & Last Name */}
            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block mb-1 font-medium">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-1 font-medium">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* ID Type Selection */}
            <div>
              <label className="block mb-1 font-medium">
                Select ID Type <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={idType}
                onChange={(e) => setIdType(e.target.value)}
                required
              >
                <option value="passport">Passport</option>
                <option value="aadhaar">Aadhaar</option>
              </select>
            </div>

            {/* Conditional ID Input */}
            {idType === "passport" && (
              <div>
                <label className="block mb-1 font-medium">Passport Number</label>
                <input
                  type="text"
                  name="passport"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter passport number"
                  value={formData.passport}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {idType === "aadhaar" && (
              <div>
                <label className="block mb-1 font-medium">Aadhaar Number</label>
                <input
                  type="text"
                  name="aadhaar"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Aadhaar number"
                  value={formData.aadhaar}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

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

            {/* Confirm Password */}
            <div>
              <label className="block mb-1 font-medium">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* Emergency Contacts */}
            <div>
              <label className="block mb-2 font-medium">
                Emergency Contacts (1–3){" "}
                <span className="text-red-500">*</span>
              </label>
              {contacts.map((c, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder={`Emergency Contact Name ${i + 1}`}
                    value={c.name}
                    onChange={(e) => handleContactChange(i, "name", e.target.value)}
                    className="w-1/2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required={i === 0}
                  />
                  <input
                    type="tel"
                    placeholder={`Emergency Contact Number ${i + 1}`}
                    value={c.number}
                    onChange={(e) => handleContactChange(i, "number", e.target.value)}
                    className="w-1/2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required={i === 0}
                  />
                </div>
              ))}

              {contacts.length < 3 && (
                <button
                  type="button"
                  onClick={addContact}
                  className="w-full mt-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                >
                  + Add Another Contact
                </button>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
            >
              Register
            </button>

            {/* Sign-in link */}
            <p className="text-center mt-3 text-black-200">
              Already have an account?{" "}
              <Link
                to="/tourist/signin"
                className="text-blue-700 font-semibold hover:underline"
              >Sign In</Link> 
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}