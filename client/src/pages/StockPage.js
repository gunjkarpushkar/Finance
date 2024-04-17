import React, { useState } from "react";
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
      <p>
        Investing in stocks is a powerful way to build wealth by tapping into
        the financial successes of top companies. However, the stock market can
        be complex and unpredictable. Our advanced stock predictor tool
        simplifies these challenges by providing you with precise, data-driven
        insights, enabling smarter investment decisions. Enhance your investment
        strategy and boost your returns—try our stock predictor today and invest
        with confidence!
      </p>
      <Stocks onForecastData={handleForecastData} />
      {error && <p>Error: {error}</p>}
      {forecastData && <StockPlot data={forecastData} />}
    </div>
  );
}

export default StockPage;
