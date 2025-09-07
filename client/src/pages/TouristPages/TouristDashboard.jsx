import React, { useState, useRef } from "react";
import Navbar from "../../components/Navbar";
import TouristSidebar from "./TouristSidebar";
import ProfileQR from "./ProfileQR";
import TravelIdQR from "./TravelIdQR";
import Alerts from "./Alerts";
import PoliceBooths from "./PoliceBooths";
import SafetyScore from "./SafetyScore";
import Footer from "../../components/Footer";
import { Card, CardContent } from "../../components/Card";
import { Button } from "../../components/Button";

const TouristDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [panicActive, setPanicActive] = useState(false);
  const [panicCountdown, setPanicCountdown] = useState(5);
  const panicTimerRef = useRef(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Static journey for demo
  const currentJourney = {
    travelId: "TOUR-X5AJN5VN",
    validTill: "2025-09-07T18:00:00Z",
  };

  // Panic Button Logic
  const handlePanicClick = () => {
    setPanicActive(true);
    setPanicCountdown(5);
    if (panicTimerRef.current) clearInterval(panicTimerRef.current);
    panicTimerRef.current = setInterval(() => {
      setPanicCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(panicTimerRef.current);
          // Here you would send the location/report to authorities
          setPanicActive(false);
          alert("Your location has been shared with the nearest help center and police station.");
          return 5;
        }
        return prev - 1;
      });
    }, 1000);
    // Optionally, get location here and prepare to send
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // You can send position.coords.latitude & position.coords.longitude to backend
        },
        () => {}
      );
    }
  };

  const handleCancelPanic = () => {
    setPanicActive(false);
    setPanicCountdown(5);
    if (panicTimerRef.current) clearInterval(panicTimerRef.current);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-20">
        <Navbar />
      </div>

      <div className="flex flex-1">
        {/* Sticky Sidebar */}
        <div className="sticky top-16 h-[calc(100vh-64px)]">
          <TouristSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>

        {/* Scrollable Main Content */}
        <main className="flex-1 p-6 overflow-y-auto h-[calc(100vh-64px)]">
          <h1 className="text-2xl font-bold text-blue-700 mb-6">Dashboard</h1>

          {/* Profile + Journey + Safety + Alerts + Police Booths */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <ProfileQR />
            <TravelIdQR journey={currentJourney} />
            <SafetyScore />
            <PoliceBooths />
            <Alerts />
          </div>

          {/* Emergency + Tools Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Emergency Card */}
            <Card className="bg-red-50 border-red-300 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-red-600 mb-3">
                  🚨 Emergency
                </h2>
                <p className="mb-4 text-gray-700">
                  Press in case of emergency. Your location will be sent to authorities.
                </p>
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
                  onClick={handlePanicClick}
                >
                  Activate Panic Button
                </Button>
              </CardContent>
            </Card>

            {/* Travel Tools */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-3">🧭 Travel Tools</h2>
                <div className="space-y-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    AI Travel Planner
                  </Button>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Multilingual Tool
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Route Generator + Multilingual Support */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Route Generator */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-3">
                  🗺️ Today’s Travel Route Generator
                </h2>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Your Preferences
                </label>
                <textarea
                  className="w-full p-2 border rounded-lg mb-4"
                  placeholder="I love historical sites and local food. Not a fan of crowded places. Budget is moderate."
                />
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Your Current Location
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg mb-4"
                  placeholder="City Center Hotel"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Generate Route
                </Button>
              </CardContent>
            </Card>

            {/* Multilingual Support */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-3">
                  🌍 Multilingual Support Tool
                </h2>
                <p className="mb-3 text-gray-700">
                  Translate text to communicate with local speakers.
                </p>
                <textarea
                  className="w-full p-2 border rounded-lg mb-4"
                  placeholder="Type text to translate..."
                />
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Translate
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Floating Panic Button */}
      <button
        className="fixed bottom-6 left-6 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-full shadow-lg z-50"
        onClick={handlePanicClick}
      >
        🚨 Panic Button
      </button>

      {/* Panic Popup */}
      {panicActive && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Emergency Alert</h2>
            <p className="mb-4 text-gray-800">
              Your location will be shared with the nearest help center and police station in <span className="font-bold">{panicCountdown}</span> seconds.
            </p>
            <Button
              className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-lg font-semibold"
              onClick={handleCancelPanic}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default TouristDashboard;
