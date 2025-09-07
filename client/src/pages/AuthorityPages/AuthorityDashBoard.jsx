import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Eye, MapPin, Users, AlertTriangle, Zap } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Tourist locations for the map panel (with coordinates)
const MAP_LOCATIONS = [
  { name: "Guwahati", coords: [26.1445, 91.7362], risk: "safe", tourists: 247 },
  { name: "Kaziranga NP", coords: [26.5775, 93.1711], risk: "medium", tourists: 156 },
  { name: "Tawang", coords: [27.5742, 91.8793], risk: "high", tourists: 89 },
  { name: "Majuli Island", coords: [26.9565, 94.1450], risk: "low", tourists: 67 },
  { name: "Shillong", coords: [25.5788, 91.8933], risk: "medium", tourists: 134 },
];

const RISK_COLORS = {
  safe: "blue",
  low: "green",
  medium: "orange",
  high: "red",
};

// Create custom icons for risks
const createIcon = (color) =>
  new L.DivIcon({
    className: "custom-marker",
    html: `<div style="
        background:${color};
        color:white;
        border-radius:50%;
        width:30px;
        height:30px;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:12px;
        font-weight:bold;
        border:2px solid white;
        box-shadow:0 0 5px rgba(0,0,0,0.3);
      ">•</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });

function AuthorityDashBoard() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  const summaryStats = [
    { icon: <Users />, label: "Total Tourists", value: "1,191", info: "+12.3% vs yesterday", accent: "text-blue-400" },
    { icon: <AlertTriangle />, label: "Active Alerts", value: "5", info: "2 High Risk Areas", accent: "text-red-500" },
    { icon: <Shield />, label: "Safety Score", value: "40 /100", info: "CRITICAL", accent: "text-red-400" },
    { icon: <MapPin />, label: "Monitored Zones", value: "12", info: "3 States Covered", accent: "text-yellow-400" },
    { icon: <Zap />, label: "Emergency Units", value: "8", info: "READY", accent: "text-green-400" },
    { icon: <Zap />, label: "Avg Response", value: "4.1 min", info: "Target: <5 min", accent: "text-blue-300" },
  ];

  return (
    <div className="min-h-screen bg-[#0a1023] text-white flex flex-col">
      <Header currentTime={currentTime} />
      <main className="flex-1 container mx-auto px-4 py-6 flex flex-col gap-8">
        <StatsGrid summaryStats={summaryStats} />
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-6">
            <MapPanel />
            <AuthorityControls />
          </div>
          <div className="w-full lg:w-[350px] flex flex-col gap-6">
            <SafetyScorePanel />
            <AlertPanel />
          </div>
        </div>
      </main>
    </div>
  );
}

function Header({ currentTime }) {
  return (
    <header className="w-full border-b border-[#21295c] px-6 py-4 flex items-center justify-between bg-[#10173a]">
      <div className="flex items-center space-x-4">
        <Shield className="h-8 w-8 text-blue-400" />
        <div>
          <h1 className="text-2xl font-bold">Tourist Safety Command Center</h1>
          <p className="text-sm text-blue-200">Northeast India Tourism Monitoring System</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Badge icon={<Eye className="mr-2 h-4 w-4" />} label="LIVE" />
        <div className="text-right">
          <div className="text-sm font-medium">{currentTime.toLocaleTimeString()}</div>
          <div className="text-xs text-blue-200">{currentTime.toLocaleDateString()}</div>
        </div>
      </div>
    </header>
  );
}

function StatsGrid({ summaryStats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {summaryStats.map((stat, idx) => (
        <div
          key={idx}
          className="rounded-xl bg-gradient-to-br from-[#181f3a] to-[#232c50] flex flex-col items-center p-4 shadow border-b-4 border-blue-900"
        >
          <div className={`text-2xl mb-2 ${stat.accent}`}>{stat.icon}</div>
          <div className="font-semibold text-lg">{stat.label}</div>
          <div className={`font-bold text-xl mb-1 ${stat.accent}`}>{stat.value}</div>
          <div className="text-xs text-blue-200">{stat.info}</div>
        </div>
      ))}
    </div>
  );
}

function MapPanel() {
  return (
    <div className="bg-[#181f3a] rounded-xl p-6 shadow flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <MapPin className="h-5 w-5 text-blue-400" />
          <h2 className="text-lg font-semibold">Northeast India - Live Tourist Map</h2>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <Dot color={RISK_COLORS.safe} label="Safe" />
          <Dot color={RISK_COLORS.low} label="Low Risk" />
          <Dot color={RISK_COLORS.medium} label="Medium" />
          <Dot color={RISK_COLORS.high} label="High Risk" />
        </div>
      </div>
      <div className="relative rounded-lg overflow-hidden" style={{ height: "400px" }}>
        <MapContainer center={[26.5, 92.5]} zoom={7} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {MAP_LOCATIONS.map((loc) => (
            <Marker
              key={loc.name}
              position={loc.coords}
              icon={createIcon(RISK_COLORS[loc.risk])}
            >
              <Popup>
                <strong>{loc.name}</strong>
                <br />
                Tourists: {loc.tourists}
                <br />
                Risk: <span style={{ color: RISK_COLORS[loc.risk] }}>{loc.risk}</span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

function AuthorityControls() {
  return (
    <div className="bg-gradient-to-r from-[#181f3a] to-[#1f2640] rounded-xl p-6 shadow mt-2">
      <div className="flex items-center space-x-3 mb-4">
        <Zap className="h-5 w-5 text-yellow-400" />
        <h2 className="text-lg font-semibold">Police Authority Controls</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ActionButton label="Deploy Unit A" color="blue" />
        <ActionButton label="Issue Warning" color="yellow" />
        <ActionButton label="Emergency Alert" color="red" />
        <ActionButton label="All Clear" color="green" />
      </div>
    </div>
  );
}

function Badge({ icon, label }) {
  return (
    <div className="inline-flex items-center bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-xs font-semibold">
      {icon}
      {label}
    </div>
  );
}

function Dot({ color, label }) {
  return (
    <span className="flex items-center mr-2">
      <span className="inline-block w-3 h-3 rounded-full mr-1" style={{ background: color }}></span>
      <span className="text-blue-200">{label}</span>
    </span>
  );
}

function ActionButton({ label, color }) {
  const base = "w-full rounded-lg py-3 font-bold text-sm shadow transition";
  const colorMap = {
    blue: "bg-blue-600 hover:bg-blue-700 text-white",
    yellow: "bg-yellow-500 hover:bg-yellow-600 text-black",
    red: "bg-red-500 hover:bg-red-600 text-white",
    green: "bg-green-500 hover:bg-green-600 text-white",
  };
  return (
    <button className={`${base} ${colorMap[color]}`}>{label}</button>
  );
}

function SafetyScorePanel() {
  const safetyScore = 81;
  const grade = safetyScore >= 80 ? "EXCELLENT" : safetyScore >= 60 ? "MODERATE" : "CRITICAL";
  const factors = [
    { label: "Area Security", value: 85 },
    { label: "Tourist Density", value: 65 },
    { label: "Weather Conditions", value: 92 },
    { label: "Emergency Response", value: 88 },
    { label: "Transport Safety", value: 73 },
  ];
  const areaBreakdown = [
    { area: "Guwahati City", tourists: 247, score: 85 },
    { area: "Kaziranga NP", tourists: 156, score: 72 },
    { area: "Tawang", tourists: 89, score: 45 },
    { area: "Majuli Island", tourists: 67, score: 91 },
    { area: "Shillong", tourists: 134, score: 78 },
  ];
  return (
    <div className="bg-[#181f3a] rounded-xl p-4 shadow flex flex-col">
      <div className="flex items-center mb-2">
        <Shield className="mr-2 h-5 w-5 text-green-400" />
        <span className="font-bold text-white">Tourist Safety Score</span>
        <span className={`ml-auto text-xs font-semibold px-3 py-1 rounded-full ${grade === "EXCELLENT" ? "bg-green-700" : "bg-yellow-600"}`}>{grade}</span>
      </div>
      <div className="text-4xl font-extrabold text-green-400">{safetyScore}</div>
      <div className="text-xs text-blue-200 mb-2">Auto-calculated from travel patterns & area sensitivity</div>
      <Progress colorStart="red" colorMid="yellow" colorEnd="green" percent={safetyScore} />
      <div className="text-gray-200 text-xs flex justify-between py-1">
        <span>Critical (0-59)</span>
        <span>Moderate (60-79)</span>
        <span>Excellent (80-100)</span>
      </div>
      <div className="mt-2">
        {factors.map((factor) => (
          <div key={factor.label} className="flex items-center my-1">
            <span className="flex-1 text-sm">{factor.label}</span>
            <span className="w-10 mr-2 text-right">{factor.value}%</span>
            <div className="w-1/2 h-2 rounded bg-[#232c50] mr-2">
              <div
                className={`h-2 rounded ${factor.value > 80 ? "bg-green-400" : factor.value > 70 ? "bg-yellow-300" : "bg-orange-400"}`}
                style={{ width: `${factor.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <div className="text-sm font-bold mb-1">Area Breakdown</div>
        {areaBreakdown.map((area) => (
          <div key={area.area} className="flex justify-between text-xs py-0.5">
            <span>
              {area.area} <span className="text-blue-300">({area.tourists})</span>
            </span>
            <span className={`font-bold px-2 py-0.5 rounded-full ${area.score > 80 ? "bg-green-700" : area.score > 60 ? "bg-yellow-500" : "bg-red-600"}`}>{area.score}</span>
          </div>
        ))}
      </div>
      <div className="text-xs text-blue-200 mt-2">Last updated: {new Date().toLocaleTimeString()} • Auto-refresh every 8 seconds</div>
    </div>
  );
}

function AlertPanel() {
  const alerts = [
    { type: "HIGH", time: "07:11", title: "New Incident Detected", location: "Majuli Island", affected: 12 },
    { type: "MEDIUM", time: "07:06", title: "New Incident Detected", location: "Kohima", affected: 6 },
    { type: "LOW", time: "06:53", title: "New Incident Detected", location: "Majuli Island", affected: 20 },
    { type: "HIGH", time: "14:23", title: "Overcrowding Alert", location: "Tawang Monastery", affected: 42 },
  ];
  const colorMap = {
    HIGH: "bg-red-700 text-red-200",
    MEDIUM: "bg-yellow-600 text-black",
    LOW: "bg-green-700 text-green-200",
  };
  return (
    <div className="bg-[#181f3a] rounded-xl p-4 shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-white">Alert System</span>
        <span className="bg-red-600 px-3 py-1 rounded-full text-xs font-bold">10 ACTIVE</span>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {alerts.map((alert, idx) => (
          <div key={idx} className={`rounded-lg p-3 shadow ${colorMap[alert.type]} flex flex-col mb-1`}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold">{alert.type}</span>
              <span className="text-xs">{alert.time}</span>
            </div>
            <div className="mt-1 text-base font-bold">{alert.title}</div>
            <div className="text-xs">📍 {alert.location} • {alert.affected} tourists affected</div>
            <div className="text-xs">Automated alert triggered</div>
            <button className="mt-2 self-end text-xs text-white rounded hover:underline">Resolve</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Progress({ percent, colorStart, colorMid, colorEnd }) {
  let color = colorStart;
  if (percent > 79) color = colorEnd;
  else if (percent > 59) color = colorMid;
  return (
    <div className="w-full h-3 bg-[#232c50] rounded mb-2">
      <div
        className="h-3 rounded transition"
        style={{
          width: `${percent}%`,
          background: color,
        }}
      />
    </div>
  );
}

export default AuthorityDashBoard;