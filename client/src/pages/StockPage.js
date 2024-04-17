import React, { useState } from 'react';
import Stocks from "../components/Stocks";
import StockPlot from "../components/StockPlot";

function StockPage() {
    const [forecastData, setForecastData] = useState(null);
    const [error, setError] = useState(null);
  
    const handleForecastData = (data) => {
      setForecastData(data);
    };  
  
    return (
        <div>
        <h1>Stock Forecast</h1>
        <Stocks onForecastData={handleForecastData}/>
        {error && <p>Error: {error}</p>}
        {forecastData && <StockPlot data={forecastData} />}    
        </div>
    )
    }
  
  export default StockPage;