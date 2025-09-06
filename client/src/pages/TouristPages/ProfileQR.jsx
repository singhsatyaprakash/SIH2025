import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

const ProfileQR = () => {
  const profileId = "USER-123456789"; // fixed profile QR
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    QRCode.toDataURL(profileId)
      .then(url => setQrUrl(url))
      .catch(() => setQrUrl(""));
  }, [profileId]);

  return (
    <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
      <h2 className="font-semibold mb-2">Your Profile QR</h2>
      {qrUrl ? (
        <img src={qrUrl} alt="Profile QR" width={120} height={120} />
      ) : (
        <span>Generating QR...</span>
      )}
      <p className="text-gray-600 mt-2">{profileId}</p>
    </div>
  );
};

export default ProfileQR;