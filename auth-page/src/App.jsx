import { useState, useRef } from "react";

export default function App() {
  const [locationGranted, setLocationGranted] = useState(false);
  const [cameraGranted, setCameraGranted] = useState(false);
  const videoRef = useRef(null);

  // GPS permission
  const handleGPSAccess = () => {
    alert("Please allow GPS access for attendance tracking.");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          console.log("Latitude:", pos.coords.latitude);
          console.log("Longitude:", pos.coords.longitude);
          setLocationGranted(true);
        },
        (err) => {
          console.error("GPS denied:", err);
          setLocationGranted(false);
        }
      );
    } else {
      alert("Geolocation not supported in this browser.");
    }
  };

  // Camera permission
  const handleCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraGranted(true);
      }
    } catch (err) {
      console.error("Camera denied:", err);
      setCameraGranted(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Attendance Verification</h1>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button
          onClick={handleGPSAccess}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Allow GPS Tracking
        </button>

        <button
          onClick={handleCameraAccess}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Scan Face
        </button>
      </div>

      {/* Show status messages */}
      {locationGranted && (
        <p className="mt-4 text-green-600">✅ GPS access granted</p>
      )}

      {/* Always keep video visible */}
      <div className="mt-6 flex flex-col items-center">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-80 h-60 rounded-lg border shadow bg-black"
        />
        {cameraGranted ? (
          <p className="mt-2 text-green-600">✅ Camera access granted</p>
        ) : (
          <p className="mt-2 text-gray-500">Camera feed will appear here</p>
        )}
      </div>
    </div>
  );
}
