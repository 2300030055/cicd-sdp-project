import React from "react";
import "../Styles/Home.css";
import { Link } from "react-router-dom";
import homeBg from "../assets/images/home image2.jpg"; // ✅ Import your background image

function Home() {
  const pageStyle = {
    width: "100vw",
    minHeight: "100vh",
    backgroundImage: `url(${homeBg})`,
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
    maxWidth: "600px",
    width: "100%",
  };

  return (
    <div style={pageStyle}>
      <div style={overlayStyle}>
        <h1>Welcome to Home Services Booking</h1>
        <p>Book trusted professionals for home repairs, cleaning, and more!</p>
        <Link to="/services" className="btn primary">Browse Services</Link>
        <div style={{ marginTop: '2.5rem', color: '#ffd700', fontWeight: 700, fontSize: '1.2rem' }}>
          <div style={{ color: '#fff', fontWeight: 600, fontSize: '1.1rem', marginBottom: 8 }}>
            <span style={{ color: '#ffd700', fontWeight: 700 }}>Our services are available only in Andhra Pradesh:</span>
          </div>
          <ul style={{ color: '#fff', fontWeight: 500, fontSize: '1.1rem', margin: 0, paddingLeft: 24, textAlign: 'left' }}>
            <li>Avanigadda, Krishna Dt</li>
            <li>Vijayawada, NTR Dt</li>
            <li>Nidadhavolu, Godavari BT</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;