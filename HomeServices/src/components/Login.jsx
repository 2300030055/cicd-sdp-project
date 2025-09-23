import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import bgImage from "../assets/images/unnamed.png"; // ✅ Background image

function Login({ setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMsg, setResetMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await fetch("http://localhost:6060/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (response.ok) {
        setSuccess("Login successful!");
        setError("");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", email);
        setLoggedIn(true);
        setTimeout(() => navigate("/dashboard"), 500);
      } else {
        setError("Invalid email or password, or account does not exist.");
        setSuccess("");
      }
    } catch (err) {
      setError("Error connecting to server. Please try again later.");
    }
  }

  async function handleReset(e) {
    e.preventDefault();
    setResetMsg("");
    try {
      const response = await fetch("http://localhost:6060/api/users/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail })
      });
      if (response.ok) {
        setResetMsg("Reset link sent to your email (simulated).");
      } else {
        setResetMsg("Email not found.");
      }
    } catch (err) {
      setResetMsg("Error connecting to server. Please try again later.");
    }
  }

  const pageStyle = {
    width: "100vw",
    minHeight: "100vh",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  };

  const formStyle = {
    background: "rgba(0, 0, 0, 0.6)",
    padding: "2.5rem 2rem 2rem 2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    maxWidth: "400px",
    width: "100%",
    color: "#fff",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.2rem",
  };

  return (
    <div style={pageStyle}>
      {!showReset ? (
        <form style={formStyle} onSubmit={handleSubmit}>
          <h2>Login to Your Account</h2>
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              width: "90%",
              padding: "0.8rem 1rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1.1rem",
            }}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              width: "90%",
              padding: "0.8rem 1rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1.1rem",
            }}
          />
          <button
            className="login-button"
            type="submit"
            style={{
              width: "90%",
              padding: "0.8rem 0",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: 700,
            }}
          >
            Login
          </button>
          <button
            type="button"
            style={{ background: "none", color: "#11998e", border: "none", cursor: "pointer", marginTop: 8, textDecoration: "underline" }}
            onClick={() => setShowReset(true)}
          >
            Forgot Password?
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "lightgreen" }}>{success}</p>}
          <p className="login-switch">
            Don&apos;t have an account?{" "}
            <Link className="switch-link" to="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      ) : (
        <form style={formStyle} onSubmit={handleReset}>
          <h2>Reset Password</h2>
          <input
            className="login-input"
            type="email"
            placeholder="Enter your email"
            required
            value={resetEmail}
            onChange={e => setResetEmail(e.target.value)}
            style={{
              width: "90%",
              padding: "0.8rem 1rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1.1rem",
            }}
          />
          <button
            className="login-button"
            type="submit"
            style={{
              width: "90%",
              padding: "0.8rem 0",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: 700,
            }}
          >
            Send Reset Link
          </button>
          <button
            type="button"
            style={{ background: "none", color: "#11998e", border: "none", cursor: "pointer", marginTop: 8, textDecoration: "underline" }}
            onClick={() => setShowReset(false)}
          >
            Back to Login
          </button>
          {resetMsg && <p style={{ color: resetMsg.includes("sent") ? "green" : "red" }}>{resetMsg}</p>}
        </form>
      )}
    </div>
  );
}

export default Login;
