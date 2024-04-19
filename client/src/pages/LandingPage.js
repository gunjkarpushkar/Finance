import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <h1>Welcome to Our App!</h1>
      <p>Learn more about our app here...</p>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
}

export default LandingPage;
