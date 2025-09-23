import React from "react";
import bookingBg from "../assets/images/Booking.webp"; // adjust path if needed

function Booking() {
  const pageStyle = {
    width: "100vw",
    minHeight: "100vh",
    backgroundImage: `url(${bookingBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    color: "#fff", // ensures text is readable
    textAlign: "center",
    backdropFilter: "brightness(0.8)", // optional dimming
  };

  return (
    <div style={pageStyle}>
      <h1>Book Your Service</h1>
      <p>Select a provider, choose a time, and confirm your booking.</p>
      {/* Add your booking form or content here */}
    </div>
  );
}

export default Booking;