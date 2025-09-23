import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Import background and service images from src/assets/images
import backgroundImg from "../assets/images/mainbackgrnd.jpeg";
import plumbingImg from "../assets/images/plumbing.jpeg";
import electricalImg from "../assets/images/electrical.jpeg";
import cleaningImg from "../assets/images/cleaning.jpeg";
import carpentryImg from "../assets/images/carpentry.webp";
import acheaterImg from "../assets/images/acheater.avif";
import acServiceImg from "../assets/images/acService.avif";
import gardeningImg from "../assets/images/gardening.jpeg";

// Layered layout styles
const pageStyle = {
  position: "relative",
  width: "100vw",
  minHeight: "100vh",
  overflow: "hidden",
};

const backgroundStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: `url(${backgroundImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  filter: "brightness(0.4)", // dims the background
  zIndex: 0,
};

const contentStyle = {
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "3rem",
};

// Grid layout for service cards
const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)", // 3 columns
  gap: "2rem",
  padding: "2rem",
  width: "100%",
  maxWidth: "1100px", // wider container
};

// Individual card styling
const cardStyle = {
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  overflow: "hidden",
  textAlign: "center",
  cursor: "pointer",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
};

// Image styling inside cards
const imageStyle = {
  width: "100%",
  height: "160px",
  objectFit: "cover",
};

// Title styling
const titleStyle = {
  padding: "1rem",
  fontSize: "1.1rem",
  fontWeight: "600",
  color: "#5f0a87",
};

function ServicesList() {
  const [services] = useState([
    { id: 1, name: "Plumbing", image: plumbingImg },
    { id: 2, name: "Electrical Repairs", image: electricalImg },
    { id: 3, name: "Cleaning", image: cleaningImg },
    { id: 4, name: "Carpentry", image: carpentryImg },
    { id: 5, name: "AC/Heater Servicing", image: acheaterImg },
    { id: 7, name: "Gardening/Lawn Care", image: gardeningImg },
  ]);

  return (
    <div style={pageStyle}>
      <div style={backgroundStyle}></div>
      <div style={contentStyle}>
        <h1 style={{ color: "#fff", marginBottom: "1rem", fontSize: "2.5rem" }}>Services</h1>
        <div style={gridStyle}>
          {services.map(service => (
            <Link
              key={service.id}
              to={`/services/${service.id}/providers`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={cardStyle}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                }}
              >
                <img
                  src={service.image}
                  alt={service.name}
                  style={imageStyle}
                  onError={e => {
                    e.target.style.display = "none"; // Hide broken image
                  }}
                />
                <div style={titleStyle}>{service.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServicesList;