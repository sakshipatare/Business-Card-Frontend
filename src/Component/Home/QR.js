import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";

const QR = () => {
  const [user, setUser] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  if (!user) return <p>Loading QR...</p>;

  const frontendUrl = process.env.REACT_APP_FRONTEND_URL;
  const encodedEmail = encodeURIComponent(user.email);
  const profileLink = `${frontendUrl}/home?email=${encodedEmail}`;

  // 🔽 Store scanned user's ID in the backend
  const handleQRScan = async (scannedUserId) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);

      const response = await fetch(`${apiUrl}/homes/scan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ scannedUserId }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("✅ Scanned user stored:", data);
      } else {
        console.warn("⚠️ Scan failed:", data.message || data.error);
      }
    } catch (error) {
      console.error("❌ Error scanning user:", error);
    }
  };

  // 🔽 This function should be called after a successful QR scan
  const onScanSuccess = (scannedData) => {
    // scannedData could be an email, ID, or URL depending on your QR format
    // Extract ID from email if needed — adjust based on what you encode in the QR
    const scannedUserId = scannedData; 
    handleQRScan(scannedUserId);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Share Your Digital Card</h2>
      <QRCode size={400} value={profileLink} />
      <p>Scan this QR to connect with me!</p>

      {/* 🔽 Simulate scan for testing */}
      <button
        onClick={() => onScanSuccess(user._id)}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Simulate My QR Scan
      </button>
    </div>
  );
};

export default QR;
