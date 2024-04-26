import React, { useState } from "react";
import LoginPage from "./pages/loginPage.js"; // Adjust the path as necessary
import Navbar from "./components/navbar.js"; // Ensure the path is correct
//import MainContent from './MainContent';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StockPage from "./pages/StockPage.js";
import Home from "./pages/Home.js";
import LandingPage from "./pages/LandingPage.js";
import CurrentFinancialInformation from "./components/CurrentFinancialInformation.js";
import FinancialAdvice from "./components/FinancialAdvice.js";


/**
 * App is the root component of the application.
 * It manages the login status and routes between different pages/components.
 *
 * @component
 * @returns {JSX.Element} The root component of the application.
 */
function App() {

  /**
   * State to manage the login status.
   * @type {[boolean, function]} isLoggedIn - A boolean indicating whether the user is logged in or not.
   */
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /**
   * Handles the login status change.
   * @param {boolean} loginStatus - The new login status.
   */
  const handleLogin = (loginStatus) => {
    setIsLoggedIn(loginStatus);
  };

  /**
   * Handles the logout action.
   */
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  /**
   * Renders different components based on the login status and routes.
   * @returns {JSX.Element} The root component of the application.
   */
  return (
    <Router>
      <div>
        {isLoggedIn ? (
          <>
            <Navbar onLogout={handleLogout} />
            <Routes>
              <Route path="/stocks" element={<StockPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/logout" element={<LoginPage />} />
              <Route path="/Current Financial Information" element={<CurrentFinancialInformation />} />
              <Route path="/Financial Advice" element = {<FinancialAdvice/>} />
              {/* Default path goes to home page  */}
              <Route path="/" element={<Home />} />
            </Routes>
          </>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route
                path="/login"
                element={<LoginPage onLogin={handleLogin} />}
              />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
