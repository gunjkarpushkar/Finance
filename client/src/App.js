import React, { useState } from 'react';
import LoginPage from "./loginPage"; // Adjust the path as necessary
import Navbar from './navbar'; // Ensure the path is correct
import MainContent from './MainContent';
import FinancialDashboard from './financialDashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = (loginStatus) => {
    setIsLoggedIn(loginStatus);
  };

  return (
      <div>
        {isLoggedIn ? (
          <>
            <Navbar />
            <MainContent /> {}
            <FinancialDashboard/>
          </>
        ) : (
          <LoginPage onLogin={handleLogin} />
        )}
      </div>
    );
  };

export default App;
