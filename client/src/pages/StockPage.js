import React, { useState, useEffect } from "react";
import Stocks from "../components/Stocks";
import StockPlot from "../components/StockPlot";
import "./stockPage.css";

function StockPage() {
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [latestPrediction, setLatestPrediction] = useState(null);
  const [difference, setDifference] = useState(null);

  useEffect(() => {
    if (latestPrediction !== null && currentPrice !== null) {
      let dif = (latestPrediction - currentPrice).toFixed(2);
      setDifference(dif);
    }
  }, [latestPrediction, currentPrice]);

  const handleForecastData = (data) => {
    const plotData = JSON.parse(data.graph);
    const currPrice = Number(data.current_price).toFixed(2);
    const latestPrice = Number(data.latest_prediction).toFixed(2);
    setForecastData(plotData);
    setCurrentPrice(currPrice);
    setLatestPrediction(latestPrice);
    setDifference(latestPrice - currPrice);
    // Reset the error message upon every succcessful retrieval
    setError(null);
  };

  const handleError = (error) => {
    setError("Invalid stock ticker");
  };

  return (
    <div className="stock-page">
      <header className="header">
        <h1>Stock Forecast</h1>
        <p>
          Investing in stocks is a powerful way to build wealth by tapping into
          the financial successes of top companies. However, the stock market
          can be complex and unpredictable. Our advanced stock predictor tool
          simplifies these challenges by providing you with precise, data-driven
          insights, enabling smarter investment decisions.
        </p>
      </header>
      <main>
        <Stocks onForecastData={handleForecastData} onError={handleError} />
        {error && <div className="error-message">Error: {error}</div>}
        <div className="price-info">
          <p>
            The current price for one share of this stock is:{" "}
            <strong>${currentPrice}</strong>
          </p>
          <p>
            The expected price after this time period is:{" "}
            <strong>${latestPrediction}</strong>
          </p>
          <p>
            You could possibly profit <strong>${difference}</strong> per share
            with this investment!
          </p>
        </div>
        <div className="plot-container">
          <p>
            TIP: Hover your mouse over the graph to see stock prices! You can
            use the 'ds' graph below to adjust your view of the graph.
          </p>
          {forecastData && <StockPlot data={forecastData} />}
        </div>
      </main>
    </div>
  );
}

export default StockPage;
