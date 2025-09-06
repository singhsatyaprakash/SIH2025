import React from "react";

const SafetyScore = () => {
  const score = 8.5; // static for now
  const alert = score < 5 ? "⚠️ Be cautious" : "✅ Safe";

  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <h2 className="font-semibold mb-2">Safety Score</h2>
      <p className="text-3xl font-bold text-blue-600">{score}/10</p>
      <p className="text-gray-600 mt-2">{alert}</p>
    </div>
  );
};

export default SafetyScore;
