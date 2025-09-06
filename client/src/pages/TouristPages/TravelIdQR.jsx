import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

const TravelIdQR = ({ journey }) => {
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    if (journey?.travelId) {
      QRCode.toDataURL(journey.travelId)
        .then(setQrUrl)
        .catch(() => setQrUrl(""));
    }
  }, [journey]);

  if (!journey) {
    return (
      <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
        <h2 className="font-semibold mb-2">Travel ID</h2>
        <span className="text-gray-500">No active journey</span>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center w-full">
      <h2 className="font-semibold mb-2">Current Journey QR</h2>
      {qrUrl ? (
        <img
          src={qrUrl}
          alt="Travel ID QR"
          width={120}
          height={120}
          className="mb-2"
        />
      ) : (
        <span>Generating QR...</span>
      )}
      <div className="text-center">
        <p className="text-gray-700 font-mono text-lg">{journey.travelId}</p>
        <p className="text-gray-500 text-sm mt-1">
          Valid till:{" "}
          <span className="font-semibold">
            {journey.validTill
              ? new Date(journey.validTill).toLocaleString()
              : "N/A"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default TravelIdQR;