import React, { useState, useEffect } from "react";
import Stocks from "../components/Stocks";
import StockPlot from "../components/StockPlot";
import "./stockPage.css";
/**
 * StockPage is a React component that provides financial forecasting for stocks.
 * It displays current stock prices, predicted future prices, and the potential profit.
 * It also visualizes these forecasts using the StockPlot component.
 *
 * @component
 * @returns {React.Component} Renders the stock market forecasting page with interactive data visualization.
 */
function StockPage() {
  /**
   * State to store forecast data for plotting.
   * @type {Object|null}
   */
  const [forecastData, setForecastData] = useState(null);
  /**
   * State to store error messages.
   * @type {string|null}
   */
  const [error, setError] = useState(null);
  /**
   * State to store the current price of the stock.
   * @type {number|null}
   */
  const [currentPrice, setCurrentPrice] = useState(null);
  /**
   * State to store the latest predicted price of the stock.
   * @type {number|null}
   */
  const [latestPrediction, setLatestPrediction] = useState(null);
  /**
   * State to store the difference between the current price and the latest predicted price.
   * @type {number|null}
   */
  const [difference, setDifference] = useState(null);
  /**
   * useEffect hook to calculate the difference once latestPrediction and currentPrice are available.
   */

  useEffect(() => {
    if (latestPrediction !== null && currentPrice !== null) {
      let dif = (latestPrediction - currentPrice).toFixed(2);
      setDifference(dif);
    }
  }, [latestPrediction, currentPrice]);
  /**
   * Handles the forecast data received from the Stocks component.
   * Parses the forecast data and sets the state variables accordingly.
   *
   * @param {Object} data - The forecast data object containing graph data and current stock details.
   */
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
  /**
   * Handles errors during the forecast data retrieval.
   *
   * @param {string} error - Error message to be displayed.
   */
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
            <strong>₹{currentPrice}</strong>
          </p>
          <p>
            The expected price after this time period is:{" "}
            <strong>₹{latestPrediction}</strong>
          </p>
          <p>
            You could possibly profit <strong>₹{difference}</strong> per share
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
      <footer>
        <div class="text-center p-3">
          &copy; MoneyMate.
      </div>
      </footer>
    </div>
  );
}

export default StockPage;
