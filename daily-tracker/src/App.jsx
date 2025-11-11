import { useEffect, useState } from "react";

function App() {
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [logs, setLogs] = useState([]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const handleClockIn = () => {
    const time = getCurrentTime();
    setClockInTime(time);
    setClockOutTime(null); // reset the clock-out until next time
  };

  const handleClockOut = () => {
    const time = getCurrentTime();
    setClockOutTime(time);
    setLogs((prevLogs) => [...prevLogs, { clockIn: clockInTime, clockOut: time }]);
    setClockInTime(null); // reset the clock-in until next session
  };

    return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🗓️ Daily Tracker</h1>

      <div style={{ marginTop: "30px" }}>
        {!clockInTime ? (
          <button
            onClick={handleClockIn}
            style={{
              padding: "10px 20px",
              fontSize: "18px",
              background: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Clock In
          </button>
        ) : (
          <button
            onClick={handleClockOut}
            style={{
              padding: "10px 20px",
              fontSize: "18px",
              background: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Clock Out
          </button>
        )}
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>Today's Log</h2>
        {logs.length === 0 ? (
          <p>No logs yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {logs.map((entry, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                🕒 Clocked in at <b>{entry.clockIn}</b> & Clocked out at <b>{entry.clockOut}</b>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );









  // This is to show the date, time and location as the second continuesly updating
  // const [location, setLocation] = useState("");

  // useEffect(() => {
  //   // Updating the time every second
  //   const updateTime = () => {
  //     const now = new Date();
  //     const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  //     const formattedDate = now.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
  //     setCurrentTime(`${formattedDate} ${formattedTime}`);
  //   };

  //   updateTime();

  //   // Fetching the user's location (City)
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(async (pos) => {
  //       const { latitude, longitude } = pos.coords;
  //       try {
  //         const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
  //         const data = await response.json();
  //         setLocation(data.address.city || data.address.town || data.address.village || "Unknown Location");
  //       } catch (error) {
  //         setLocation("Unable to fetch location");
  //       }
  //     });
  //   } else {
  //     setLocation("Geolocation not supported");
  //   }

  //   const intervalId = setInterval(updateTime, 1000);
  //   return () => clearInterval(intervalId);
  // }, []);

  // return (
  //   <div style={{ textAlign: 'center', marginTop: '20%' }}>
  //     <h1>Daily Tracker</h1>
  //     <h2>Date {currentTime}</h2>
  //     <h3>{location}</h3>
  //   </div>
  // );
}

export default App;
