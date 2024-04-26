import React, { useState } from "react";
import axios from "axios";
import "../pages/stockPage.css";

 /**
 * Stocks is a React component that provides an interface for selecting a stock symbol,
 * customizing forecast parameters like the number of years, and fetching forecast data
 * using an API. The component allows for either selection from a predefined list of stocks
 * or entering a custom stock symbol.
 *
 * @component
 * @param {Function} onForecastData - Callback function to handle the forecast data received from the API.
 * @param {Function} onError - Callback function to handle any errors that occur during the API call.
 * @returns {React.Component} The Stocks component that includes a form for selecting stock and years for the forecast.
 */

const Stocks = ({ onForecastData, onError }) => {

  /**
   * State to store the selected stock symbol from the dropdown or custom input.
   * @type {string}
   */
  const [selectedStock, setSelectedStock] = useState("AAPL");

  /**
   * State to store the custom stock symbol entered by the user if 'other' option is selected.
   * @type {string}
   */
  const [customStock, setCustomStock] = useState("");

  /**
   * State to store the number of years for which the stock forecast is requested.
   * @type {number}
   */
  const [years, setYears] = useState(2);

  /**
   * Handles the action triggered when the 'Get Forecast' button is clicked.
   * It fetches stock forecast data from a specified endpoint and handles response via callbacks.
   */

  const handleForecast = async () => {
    try {
      const stockToFetch =
        selectedStock === "other" ? customStock : selectedStock;
      const response = await axios.get("http://127.0.0.1:5000/get_stock", {
        params: {
          stock: stockToFetch,
          years: years,
        },
      });
      onForecastData(response.data);
    } catch (error) {
      onError(error);
      console.error("Error fetching forecast data:", error);
    }
  };

  /**
   * Updates the state with the custom stock ticker entered by the user.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object for the input change.
   */
  const handleCustomStockChange = (e) => {
    setCustomStock(e.target.value);
  };

  return (
    <div className="stock-form">
      <div className="form-group">
        <label htmlFor="stock-select">Select stock:</label>
        <select
          id="stock-select"
          value={selectedStock}
          onChange={(e) => setSelectedStock(e.target.value)}
        >
          <option value="GOOG">GOOG</option>
          <option value="AAPL">AAPL</option>
          <option value="MSFT">MSFT</option>
          <option value="GME">GME</option>
          <option value="other">Other</option>
        </select>
        {selectedStock === "other" && (
          <input
            type="text"
            placeholder="Enter Stock Ticker"
            className="custom-stock-input"
            value={customStock}
            onChange={handleCustomStockChange}
          />
        )}
      </div>
      <div className="form-group">
        <label htmlFor="years-input">Select years of prediction:</label>
        <input
          id="years-input"
          type="number"
          value={years}
          onChange={(e) => setYears(parseInt(e.target.value, 10))}
          min="1"
          max="5"
          className="years-input"
        />
      </div>
      <button onClick={handleForecast} className="forecast-button">
        Get Forecast
      </button>
    </div>
  );
};

export default Stocks;
