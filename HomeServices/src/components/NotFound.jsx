import React from "react";
import "../Styles/NotFound.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="notfound-page">
      <h1>404 - Page Not Found</h1>
      <Link to="/" className="btn primary">
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
