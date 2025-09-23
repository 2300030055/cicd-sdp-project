import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";

import Home from "./components/Home";
import ServicesList from "./components/ServicesList";
import ProvidersByService from "./components/ProvidersByService";
import ProviderProfile from "./components/ProviderProfile";
import Booking from "./components/Booking";
import UserDashboard from "./components/UserDashboard";
import ProviderDashboard from "./components/ProviderDashboard";
import Payment from "./components/Payment";
import Notifications from "./components/Notifications";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NotFound from "./components/NotFound";

import "./App.css";

const isAuthenticated = () => localStorage.getItem("isLoggedIn") === "true";

function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

function App() {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());

  // Sync loggedIn state if localStorage changes externally
  useEffect(() => {
    function handleStorageChange() {
      setLoggedIn(isAuthenticated());
    }
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setLoggedIn(false);
  };

  return (
    <Router>
      <header className="app-header">
        <nav>
          <Link to="/">Home</Link>
          {loggedIn && <Link to="/services">Services</Link>}
          {loggedIn && <Link to="/dashboard">Dashboard</Link>}
          {loggedIn && <Link to="/notifications">Notifications</Link>}
          <div style={{ flex: 1 }} />
          {loggedIn && (
            <button onClick={handleLogout} className="btn logout-btn">
              Logout
            </button>
          )}
          {!loggedIn && <Link to="/login">Login</Link>}
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ProtectedRoute><ServicesList /></ProtectedRoute>} />
          <Route path="/services/:serviceId/providers" element={<ProtectedRoute><ProvidersByService /></ProtectedRoute>} />
          <Route path="/providers/:id" element={<ProtectedRoute><ProviderProfile /></ProtectedRoute>} />
          <Route path="/booking/:providerId" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
          <Route path="/provider-dashboard" element={<ProtectedRoute><ProviderDashboard /></ProtectedRoute>} />
          <Route path="/payment/:bookingId" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
