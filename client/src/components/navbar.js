import React from "react";
import { Link } from "react-router-dom";

function Navbar({ onLogout }) {
  // Inline style for the links
  const linkStyle = {
    color: "white", // Text color white
    marginRight: "20px", // Space to the right of each link
    fontSize: "24px", // Increases font size
    textDecoration: "none", // Removes underline from links
    padding: "10px", // Adds padding to make each link bigger
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <>
      <style>
        {`
          .navbar a:hover {
            color: blue !important; /* Ensures this rule has higher specificity, changes text to blue on hover */
          }
        `}
      </style>
      <div
        className="navbar"
        style={{
          padding: "50px 0",
          backgroundColor: "black",
          textAlign: "center",
        }}
      >
        <Link to="/home" style={linkStyle}>
          Home
        </Link>
        {/* <a href="#news" style={linkStyle}>News</a> */}
        {/* <a href="#contact" style={linkStyle}>Contact</a> */}
        {/* <a href="#about" style={linkStyle}>About</a> */}
        <div onClick={handleLogout} style={{ display: "inline" }}>
          <Link to="/landing" style={linkStyle}>
            Logout
          </Link>
        </div>
        <Link to="/stocks" style={linkStyle}>
          Stocks
        </Link>
      </div>
    </>
  );
}

export default Navbar;
