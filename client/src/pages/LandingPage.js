import React from "react";
import { Link } from "react-router-dom";

import "./LandingPage.css";

/**
 * LandingPage is a React component that serves as the initial point of entry to the Money Tree AI Finance application.
 * It provides users with an introduction to the application and a quick way to navigate to the login or sign-up page.
 * 
 * @component
 * @returns {React.Component} The LandingPage component displaying the main welcome message, 
 * an invitation to log in or sign up, and a visual representation of financial analysis.
 */   

function LandingPage() {
  return (
    <>
      <div className="content">
        <div className="text-section">
          <h1>Money Tree AI Finance</h1>
          <Link to="/login">
            <button className="button">Login / Sign up</button>
          </Link>
        </div>
        <div className="image-section">
          {/* In case of error replace  with your image path */}
          <img src="./financepage-removebg.png" alt="Financial Analysis" />
        </div>
      </div>
      <div className="description">
        <p>
          Money Tree is designed to provide personalized financial advice
          through AI and machine learning technologies. It analyzes your
          financial data—such as expenses, income, and savings—to offer tailored
          recommendations for budgeting, saving, investing, and managing debt.
          This user-friendly platform guides you through entering your financial
          details, enabling the AI to deliver actionable insights and customized
          financial strategies. Prioritizing your security, it ensures all
          sensitive data is handled with the utmost care, making personal
          finance management accessible, insightful, and secure.
        </p>
      </div>
    </>
  );
}

export default LandingPage;
