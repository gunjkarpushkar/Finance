import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"; // Import the CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faHome, faInfo, faChartLine, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons"; 

/**
 * Navbar is a React component that provides a navigation bar for the application.
 * It includes links to various sections of the site, such as Home, Current Financial Information,
 * Financial Advice, Stocks, and a Logout option. The Navbar utilizes React Router's `Link` component
 * for navigation without a page refresh. It also has a custom logout function that is triggered on clicking Logout.
 *
 * @component
 * @param {Function} onLogout - A callback function passed to the component to handle user logout.
 * @returns {React.Component} A navigation bar with links to different pages and a logout functionality.
 */
function Navbar({ onLogout }) {
  /**
   * Calls the onLogout callback function to handle the logout logic.
   */
  const handleLogout = () => {
    onLogout();
  };

  return (
    <>
    
      <nav className="navbar">
        <div className="navbar-title-1">
        <h1 className="navbar-title">MoneyMate</h1>
        </div>
        <div className="link">
        <Link to="/home" className="navbar-link">
        <FontAwesomeIcon icon={faHome} /> Home
        </Link>
        <Link to="/Current Financial Information" className="navbar-link">
        <FontAwesomeIcon icon={faInfo}/>Current Financial Information
        </Link>
        <Link to="/Financial Advice" className="navbar-link">
        <FontAwesomeIcon icon={faUser} /> Financial Advice
        </Link>
        <Link to="/stocks" className="navbar-link">
        <FontAwesomeIcon icon={faChartLine} />Stocks
        </Link>
        <div onClick={handleLogout} className="navbar-logout">
          <Link to="/landing" className="navbar-link">
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </Link>
        </div>
        </div>

      </nav>
    </>
  );
}

export default Navbar;
