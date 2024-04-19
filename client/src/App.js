import React, { useState } from "react";
import LoginPage from "./pages/loginPage.js"; // Adjust the path as necessary
import Navbar from "./components/navbar.js"; // Ensure the path is correct
//import MainContent from './MainContent';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StockPage from "./pages/StockPage.js";
import Home from "./pages/Home.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (loginStatus) => {
    setIsLoggedIn(loginStatus);
  };

  return (
    <Router>
      <div>
        {isLoggedIn ? (
          <>
            <Navbar />
            <Routes>
              <Route path="/stocks" element={<StockPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/logout" element={<LoginPage />} />
              {/* Default path goes to home page  */}
              <Route path="/" element={<Home />} />
            </Routes>
          </>
        ) : (
          <LoginPage onLogin={handleLogin} />
        )}
      </div>
    </Router>
  );
}

export default App;
