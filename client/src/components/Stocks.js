import React, { useState } from "react";
import axios from "axios";
import "../pages/stockPage.css";

const Stocks = ({ onForecastData, onError }) => {
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [customStock, setCustomStock] = useState("");
  const [years, setYears] = useState(2);

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
