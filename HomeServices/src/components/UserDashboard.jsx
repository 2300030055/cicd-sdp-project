import React, { useState, useEffect } from "react";
import "../Styles/UserDashboard.css";
import { Link } from "react-router-dom";
import bgImage from "../assets/images/unnamed.png"; // ✅ Import your background image

function UserDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    const saved = currentUser
      ? JSON.parse(localStorage.getItem(`bookings_${currentUser}`)) || []
      : [];
    setBookings(saved);
  }, []);

  // Payment modal state
  const [paying, setPaying] = useState(null); // booking id
  const [payAmount, setPayAmount] = useState(0);
  const [paySuccess, setPaySuccess] = useState(false);

  // Open payment modal
  const handlePay = (booking) => {
    setPaying(booking.id);
    // Generate a random amount for demo
    setPayAmount((Math.random() * 500 + 100).toFixed(0));
    setPaySuccess(false);
  };

  // Complete payment
  const handlePayNow = () => {
    // Mark booking as paid
    const updated = bookings.map(b =>
      b.id === paying ? { ...b, status: "Paid", amount: payAmount } : b
    );
    setBookings(updated);
    // Save to localStorage
    const currentUser = localStorage.getItem("currentUser");
    localStorage.setItem(`bookings_${currentUser}`, JSON.stringify(updated));
    setPaySuccess(true);
    setTimeout(() => {
      setPaying(null);
      setPaySuccess(false);
    }, 1800);
  };

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
        <h1>Your Booking</h1>
        {/* Bookings Section */}
        <h2 style={{ color: '#ffd700', marginTop: 0 }}>Bookings</h2>
        {bookings.length === 0 ? (
          <p>
            No bookings yet. {" "}
            <Link to="/services" className="btn small">
              Book a service now
            </Link>
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {bookings.map((b) => (
              <li key={b.id} style={{ marginBottom: "2rem", fontWeight: "600", background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: "1.1rem", color: "#ffd700" }}>
                  <strong>Service:</strong> {b.serviceName}
                </div>
                <div style={{ fontSize: "1.1rem", color: "#fff" }}>
                  <strong>Shop:</strong> {b.providerName}
                </div>
                <div style={{ fontSize: "1.1rem", color: "#fff" }}>
                  <strong>Slot:</strong> {b.dateTime}
                </div>
                <div style={{ fontSize: "1.1rem", color: "#fff" }}>
                  <strong>Status:</strong> {b.status}
                </div>
                {b.status === "Paid" && b.amount && (
                  <div style={{ color: "#90ee90", fontWeight: 700, margin: "0.5rem 0" }}>
                    Payment: ₹{b.amount} <br />
                    Payment successful! Thank you from {b.providerName}!
                  </div>
                )}
                <div style={{ margin: "1rem 0 0.5rem 0", color: "#90ee90", fontWeight: 700 }}>
                  Thanks for booking from {b.providerName}!
                </div>
                {b.status !== "Paid" && (
                  <button
                    className="btn small"
                    style={{ marginTop: "0.5rem", display: "inline-block" }}
                    onClick={() => handlePay(b)}
                  >
                    Pay
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* Payment History Section */}
        <h2 style={{ color: '#ffd700', marginTop: 32 }}>Payment History</h2>
        {bookings.filter(b => b.status === "Paid").length === 0 ? (
          <p>No payments made yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {bookings.filter(b => b.status === "Paid").map((b) => (
              <li key={b.id} style={{ marginBottom: "1.5rem", fontWeight: "600", background: "rgba(0,255,0,0.08)", borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: "1.1rem", color: "#ffd700" }}>
                  <strong>Service:</strong> {b.serviceName}
                </div>
                <div style={{ fontSize: "1.1rem", color: "#fff" }}>
                  <strong>Shop:</strong> {b.providerName}
                </div>
                <div style={{ fontSize: "1.1rem", color: "#fff" }}>
                  <strong>Slot:</strong> {b.dateTime}
                </div>
                <div style={{ fontSize: "1.1rem", color: "#90ee90" }}>
                  <strong>Amount Paid:</strong> ₹{b.amount}
                </div>
                <div style={{ margin: "0.7rem 0 0.2rem 0", color: "#90ee90", fontWeight: 700 }}>
                  Payment successful! Thank you from {b.providerName}!
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Payment Modal */}
        {paying && (
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.5)", zIndex: 1000,
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <div style={{ background: "#fff", color: "#333", borderRadius: 12, padding: 32, minWidth: 320, textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.25)" }}>
              <h2>Payment</h2>
              <div style={{ fontSize: 22, margin: "1rem 0" }}>Amount: <span style={{ color: "#5f0a87" }}>₹{payAmount}</span></div>
              {!paySuccess ? (
                <button className="btn primary" style={{ minWidth: 120 }} onClick={handlePayNow}>Pay Now</button>
              ) : (
                <div style={{ color: "green", fontWeight: 700, fontSize: 18, margin: "1rem 0" }}>
                  Payment successful!<br />Thank you from {bookings.find(b => b.id === paying)?.providerName}!
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;