import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Complaint = () => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [shopName, setShopName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [location, setLocation] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          console.error("Error fetching location:", err);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!category) newErrors.category = "Please select a category.";
    if (!description.trim()) newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("description", description);
    formData.append("category", category);
    if (shopName) formData.append("shopName", shopName);
    if (vehicleNumber) formData.append("vehicleNumber", vehicleNumber);
    if (file) formData.append("proof", file);
    if (location) {
      formData.append("latitude", location.lat);
      formData.append("longitude", location.lng);
    }

    try {
      const res = await fetch("/api/complaints", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setSuccessMessage("✅ Complaint submitted successfully!");
        handleReset();
      } else {
        setErrors({ submit: "Failed to submit complaint. Please try again." });
      }
    } catch (err) {
      setErrors({ submit: "Network error: Could not submit complaint." });
      console.error("Error submitting complaint:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setDescription("");
    setCategory("");
    setShopName("");
    setVehicleNumber("");
    setFile(null);
    setPreviewUrl(null);
    setErrors({});
  };

  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
        <h2 className="text-2xl font-bold mb-6 text-red-600 flex items-center space-x-2">
          <span>🚨</span>
          <span>Report Scam or Violence</span>
        </h2>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
            {successMessage}
            <button
              onClick={() => setSuccessMessage("")}
              className="absolute top-2 right-2 text-green-700 hover:text-green-900 font-bold"
              aria-label="Close success message"
            >
              &times;
            </button>
          </div>
        )}

        {errors.submit && (
          <p className="text-red-600 mb-4 font-semibold">{errors.submit}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category */}
          <div>
            <label className="block mb-2 font-semibold" htmlFor="category">
              Category <span className="text-red-600">*</span>
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`border rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Category</option>
              <option value="scam">Scam</option>
              <option value="violence">Violence</option>
              <option value="theft">Theft</option>
              <option value="harassment">Harassment</option>
              <option value="other">Other</option>
            </select>
            {errors.category && (
              <p className="text-sm text-red-600 mt-1">{errors.category}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-semibold" htmlFor="description">
              Complaint Details <span className="text-red-600">*</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue..."
              className={`border rounded p-3 w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Optional Fields Group */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Shop/Place Name */}
            <div>
              <label className="block mb-2 font-semibold" htmlFor="shopName">
                Shop/Place Name (Optional)
              </label>
              <input
                id="shopName"
                type="text"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                placeholder="e.g., XYZ Restaurant"
                className="border rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
              />
            </div>

            {/* Vehicle Number */}
            <div>
              <label className="block mb-2 font-semibold" htmlFor="vehicleNumber">
                Vehicle Number (Optional)
              </label>
              <input
                id="vehicleNumber"
                type="text"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                placeholder="e.g., MH12AB1234"
                className="border rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
              />
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block mb-2 font-semibold" htmlFor="fileUpload">
              Upload Proof (Photo/Video)
            </label>
            <input
              id="fileUpload"
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="w-full"
            />
            {previewUrl && (
              <div className="mt-4 flex justify-center">
                {file.type.startsWith("image/") ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded shadow-md"
                  />
                ) : (
                  <video
                    src={previewUrl}
                    controls
                    className="w-56 rounded shadow-md"
                  />
                )}
              </div>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 font-semibold">
              📍 Location
            </label>
            {location ? (
              <p className="text-sm text-gray-600 select-all">
                Latitude: {location.lat.toFixed(5)}, Longitude: {location.lng.toFixed(5)}
              </p>
            ) : (
              <p className="text-sm text-gray-400 italic">Fetching location...</p>
            )}
          </div>

          {/* Submit and Reset Buttons */}
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={submitting || !category || !description.trim()}
              className={`flex-1 bg-red-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-400 transition ${
                submitting || !category || !description.trim() ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {submitting ? "Submitting..." : "Submit Complaint"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 bg-gray-200 text-gray-700 px-5 py-3 rounded-lg font-semibold hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-400 transition"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Complaint;
