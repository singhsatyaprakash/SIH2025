import React from "react";

const PoliceBooths = () => {
  const booths = [
    { name: "Connaught Place Police Booth", distance: "500m" },
    { name: "Karol Bagh Police Booth", distance: "1.2km" },
    { name: "Rajiv Chowk Police Booth", distance: "2km" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="font-semibold mb-2">Nearby Police Booths</h2>
      <ul className="text-gray-700 space-y-2">
        {booths.map((booth, i) => (
          <li key={i} className="flex justify-between">
            <span>{booth.name}</span>
            <span className="text-sm text-gray-500">{booth.distance}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PoliceBooths;
