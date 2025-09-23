import React from "react";
import "../Styles/Notifications.css";
import bgImage from "../assets/images/notification.png"; // ✅ Import your background image

function Notifications() {
  const currentUser = localStorage.getItem("currentUser");
  const bookings =
    currentUser
      ? JSON.parse(localStorage.getItem(`bookings_${currentUser}`)) || []
      : [];

  const notifications = bookings.length
    ? bookings.map(
        (booking) =>
          `Your booking with ${booking.providerName} for ${booking.dateTime} was confirmed.`
      )
    : ["No notifications yet. Book a service to receive updates."];

  const pageStyle = {
    width: "100vw",
    minHeight: "100vh",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    color: "#fff",
    textAlign: "center",
  };

  const overlayStyle = {
    background: "rgba(0, 0, 0, 0.6)",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    maxWidth: "700px",
    width: "100%",
  };

  return (
    <div style={pageStyle}>
      <div style={overlayStyle}>
        <h1>Notifications</h1>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {notifications.map((note, i) => (
            <li key={i} style={{ marginBottom: "1rem", fontWeight: "500" }}>
              {note}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Notifications;