import React, { useState } from "react";
import "../Styles/ProviderProfile.css";
import { useParams, Link, useNavigate } from "react-router-dom";

const mockProviders = [
  // Plumbing
  { id: 1, name: "Ravi Plumbing Works", serviceId: 1, rating: 4.8, reviews: ["Quick fix!", "Very professional", "Affordable rates"], availability: ["2025-09-15 10:00", "2025-09-15 14:00"] },
  { id: 7, name: "AquaFix Solutions", serviceId: 1, rating: 4.7, reviews: ["Great plumbing!", "On time", "Good rates"], availability: ["2025-09-15 11:00", "2025-09-15 16:00"] },
  { id: 8, name: "PipeMasters", serviceId: 1, rating: 4.6, reviews: ["Fixed my leak", "Professional", "Recommended"], availability: ["2025-09-15 12:00", "2025-09-15 17:00"] },
  // Electrical Repairs
  { id: 2, name: "Sharma Electricians", serviceId: 2, rating: 4.6, reviews: ["Prompt service", "Solved my issue", "Friendly staff"], availability: ["2025-09-16 09:00", "2025-09-17 15:00"] },
  { id: 9, name: "BrightSpark Electricals", serviceId: 2, rating: 4.8, reviews: ["Fast fix", "Expert team", "Safe work"], availability: ["2025-09-16 10:00", "2025-09-17 16:00"] },
  { id: 10, name: "WattWorks", serviceId: 2, rating: 4.7, reviews: ["Solved outage", "Good price", "Efficient"], availability: ["2025-09-16 11:00", "2025-09-17 17:00"] },
  // Cleaning
  { id: 3, name: "CleanSweep India", serviceId: 3, rating: 4.9, reviews: ["Excellent cleaning", "On time and neat", "Highly recommended"], availability: ["2025-09-18 08:00", "2025-09-18 12:00"] },
  { id: 11, name: "Spotless Pros", serviceId: 3, rating: 4.8, reviews: ["Very clean", "Great staff", "Affordable"], availability: ["2025-09-18 09:00", "2025-09-18 13:00"] },
  { id: 12, name: "ShineTime Cleaners", serviceId: 3, rating: 4.7, reviews: ["Sparkling results", "Quick", "Trustworthy"], availability: ["2025-09-18 10:00", "2025-09-18 14:00"] },
  // Carpentry
  { id: 4, name: "Patel Carpentry", serviceId: 4, rating: 4.7, reviews: ["Great craftsmanship", "Reliable", "Good finishing"], availability: ["2025-09-19 11:00", "2025-09-19 16:00"] },
  { id: 13, name: "WoodCrafters", serviceId: 4, rating: 4.8, reviews: ["Beautiful work", "Custom design", "Fast"], availability: ["2025-09-19 12:00", "2025-09-19 17:00"] },
  { id: 14, name: "HandyHammer", serviceId: 4, rating: 4.6, reviews: ["Fixed my door", "Nice team", "Affordable"], availability: ["2025-09-19 13:00", "2025-09-19 18:00"] },
  // AC/Heater Servicing
  { id: 5, name: "CoolCare AC Services", serviceId: 5, rating: 4.5, reviews: ["Quick AC repair", "Polite staff", "Value for money"], availability: ["2025-09-20 10:00", "2025-09-20 13:00"] },
  { id: 15, name: "AirPro Experts", serviceId: 5, rating: 4.7, reviews: ["Fixed my AC", "Great service", "Fast response"], availability: ["2025-09-20 11:00", "2025-09-20 14:00"] },
  { id: 16, name: "ClimateControl Co.", serviceId: 5, rating: 4.6, reviews: ["Cool again!", "Professional", "Recommended"], availability: ["2025-09-20 12:00", "2025-09-20 15:00"] },
  // Gardening/Lawn Care
  { id: 6, name: "GreenLeaf Gardening", serviceId: 6, rating: 4.8, reviews: ["Beautiful garden work", "Very knowledgeable", "Clean and tidy"], availability: ["2025-09-21 09:00", "2025-09-21 15:00"] },
  { id: 17, name: "Lawn Legends", serviceId: 6, rating: 4.7, reviews: ["Lawn looks great", "Quick job", "Nice team"], availability: ["2025-09-21 10:00", "2025-09-21 16:00"] },
  { id: 18, name: "GardenGurus", serviceId: 6, rating: 4.6, reviews: ["Expert gardeners", "Clean work", "Affordable"], availability: ["2025-09-21 11:00", "2025-09-21 17:00"] },
];

function ProviderProfile() {

  const { id } = useParams();
  const providerId = Number(id);
  const provider = mockProviders.find((p) => p.id === providerId);
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState("");
  const [booked, setBooked] = useState(false);

  // Find service name for this provider
  const serviceName = (() => {
    switch (provider?.serviceId) {
      case 1: return "Plumbing";
      case 2: return "Electrical Repairs";
      case 3: return "Cleaning";
      case 4: return "Carpentry";
      case 5: return "AC/Heater Servicing";
      case 6: return "Gardening/Lawn Care";
      default: return "Service";
    }
  })();

  if (!provider) return <p>Provider not found.</p>;

  const handleBook = () => {
    if (!selectedSlot) {
      alert("Please select a slot to book.");
      return;
    }
    // Save booking to localStorage for dashboard
    const currentUser = localStorage.getItem("currentUser") || "guest";
    const bookingsKey = `bookings_${currentUser}`;
    const prev = JSON.parse(localStorage.getItem(bookingsKey)) || [];
    const newBooking = {
      id: Date.now(),
      serviceName,
      providerName: provider.name,
      dateTime: selectedSlot,
      status: "Booked"
    };
    localStorage.setItem(bookingsKey, JSON.stringify([...prev, newBooking]));
    setBooked(true);
    setTimeout(() => {
      setBooked(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="provider-profile-page">
      <h1>{provider.name}</h1>
      <p>Rating: {provider.rating} / 5</p>
      <h3>Reviews:</h3>
      <ul>
        {provider.reviews.map((review, index) => (
          <li key={index}>{review}</li>
        ))}
      </ul>
      <h3>Availability:</h3>
      <ul>
        {provider.availability.map((slot, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name="slot"
                value={slot}
                checked={selectedSlot === slot}
                onChange={() => setSelectedSlot(slot)}
                style={{ marginRight: 8 }}
              />
              {slot}
            </label>
          </li>
        ))}
      </ul>
      <button
        className="btn primary"
        onClick={handleBook}
        style={{ marginBottom: 16 }}
      >
        Book Now
      </button>
      {booked && (
        <div style={{ color: 'green', fontWeight: 600, marginBottom: 12, fontSize: '1.2rem' }}>
          Booked successfully!
        </div>
      )}
      <Link to="/services" className="btn secondary">
        Back to Services
      </Link>
    </div>
  );
}

export default ProviderProfile;
