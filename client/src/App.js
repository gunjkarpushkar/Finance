import React, { useState } from 'react';
import LoginPage from "./loginPage"; // Adjust the path as necessary
import Navbar from './navbar'; // Ensure the path is correct
import MainContent from './MainContent';
import FinancialDashboard from './financialDashboard';
import Stocks from "./Stocks";
import StockPlot from "./StockPlot";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = (loginStatus) => {
    setIsLoggedIn(loginStatus);
  };

  const handleForecastData = (data, error = null) => {
    if (error) {
      setError(error);
    } else {
      setForecastData(data);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <Navbar />
          <MainContent />
          <FinancialDashboard />
          <div>
            <h1>Stock Forecast</h1>
            <Stocks onForecastData={handleForecastData}/>
            {error && <p>Error: {error}</p>}
            {forecastData && <StockPlot data={forecastData} />}
          </div>
        </>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;