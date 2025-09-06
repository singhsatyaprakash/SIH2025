import React from "react";

const Alerts = () => {
  const alerts = [
    "Heavy traffic on MG Road.",
    "Weather alert: Light rain expected.",
    "Festival crowd near India Gate.",
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow h-40 overflow-y-auto">
      <h2 className="font-semibold mb-2">Live Alerts</h2>
      <ul className="text-gray-700 space-y-2">
        {alerts.map((alert, i) => (
          <li key={i} className="text-sm">⚡ {alert}</li>
        ))}
      </ul>
    </div>
  );
};

export default Alerts;
