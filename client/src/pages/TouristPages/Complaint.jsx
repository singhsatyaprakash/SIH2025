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

  // Fetch user location
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) {
      alert("Please select a category.");
      return;
    }

    setSubmitting(true);

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
        setDescription("");
        setCategory("");
        setShopName("");
        setVehicleNumber("");
        setFile(null);
        setPreviewUrl(null);
      } else {
        alert("❌ Failed to submit complaint");
      }
    } catch (err) {
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
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-xl mt-6">
        <h2 className="text-xl font-semibold mb-4 text-red-600">
          🚨 Report Scam or Violence
        </h2>

        {successMessage && (
          <p className="mb-4 text-green-600 font-medium">{successMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category */}
          <div>
            <label className="block mb-2 font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="border rounded p-2 w-full"
            >
              <option value="">Select Category</option>
              <option value="scam">Scam</option>
              <option value="violence">Violence</option>
              <option value="theft">Theft</option>
              <option value="harassment">Harassment</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Complaint Description */}
          <div>
            <label className="block mb-2 font-medium">Complaint Details</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Describe the issue..."
              className="border rounded p-2 w-full h-28"
            />
          </div>

          {/* Optional Shop/Vehicle Details */}
          <div>
            <label className="block mb-2 font-medium">Shop/Place Name (Optional)</label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="border rounded p-2 w-full"
              placeholder="e.g., XYZ Restaurant"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Vehicle Number (Optional)</label>
            <input
              type="text"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              className="border rounded p-2 w-full"
              placeholder="e.g., MH12AB1234"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block mb-2 font-medium">Upload Proof (Photo/Video)</label>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="w-full"
            />
            {previewUrl && (
              <div className="mt-3">
                {file.type.startsWith("image/") ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded"
                  />
                ) : (
                  <video src={previewUrl} controls className="w-48 rounded" />
                )}
              </div>
            )}
          </div>

          {/* Location Info */}
          <div>
            <label className="block mb-1 font-medium">📍 Location</label>
            {location ? (
              <p className="text-sm text-gray-600">
                Latitude: {location.lat.toFixed(5)}, Longitude:{" "}
                {location.lng.toFixed(5)}
              </p>
            ) : (
              <p className="text-sm text-gray-500">Fetching location...</p>
            )}
          </div>

          {/* Submit + Reset */}
          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              {submitting ? "Submitting..." : "Submit Complaint"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
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
