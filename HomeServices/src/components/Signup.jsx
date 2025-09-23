import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      setSuccess("");

      // Simple validation
      if (!username || !email || !password) {
        setError("All fields are required");
        return;
      }

      try {
        const response = await fetch("http://localhost:9090/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: username, email, password }),
        });

        if (response.ok) {
          setSuccess("Signup successful! Please login.");
          setUsername("");
          setEmail("");
          setPassword("");
          setTimeout(() => navigate("/login"), 1000);
        } else {
          const data = await response.json();
          setError(data.message || "Signup failed. Try again.");
        }
      } catch (err) {
        setError("Error connecting to server. Please try again later.");
      }
  }

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Your Account</h2>
        <input
          className="signup-input"
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="signup-input"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="signup-input"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="signup-button" type="submit">Sign Up</button>
        {error && <p style={{ color: 'red', textAlign: "center" }}>{error}</p>}
        {success && <p style={{ color: 'green', textAlign: "center" }}>{success}</p>}
        <p className="signup-switch">
          Already have an account?{" "}
          <Link className="switch-link" to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
