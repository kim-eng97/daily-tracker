import { useEffect, useState } from "react";

function App() {
  const [currentTime, setCurrentTime] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    // Updating the time every second
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const formattedDate = now.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
      setCurrentTime(`${formattedDate} ${formattedTime}`);
    };

    updateTime();

    // Fetching the user's location (City)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          setLocation(data.address.city || data.address.town || data.address.village || "Unknown Location");
        } catch (error) {
          setLocation("Unable to fetch location");
        }
      });
    } else {
      setLocation("Geolocation not supported");
    }

    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>Daily Tracker</h1>
      <h2>Date {currentTime}</h2>
      <h3>{location}</h3>
    </div>
  );
}

export default App;
