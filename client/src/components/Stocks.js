import React, { useState } from "react";
import axios from "axios";

const Stocks = ({ onForecastData }) => {
  const [selectedStock, setSelectedStock] = useState("AAPL"); // Default stock symbol
  const [customStock, setCustomStock] = useState(""); // State to hold custom stock input
  const [years, setYears] = useState(2); // Default number of years
  const [isValidStock, setIsValidStock] = useState(true); // State to track valid stock ticker

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
      setIsValidStock(true); // Resetting to true when fetching is successful
    } catch (error) {
      console.error("Error fetching forecast data:", error);
      setIsValidStock(false); // Setting to false when fetching fails
    }
  };

  const handleCustomStockChange = (e) => {
    setCustomStock(e.target.value);
    setIsValidStock(true); // Resetting validity on input change
  };

  return (
    <div>
      <label>
        Select stock:
        <select
          value={selectedStock}
          onChange={(e) => {
            setSelectedStock(e.target.value);
            setIsValidStock(true); // Resetting validity when selecting from dropdown
          }}
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
            value={customStock}
            onChange={handleCustomStockChange}
          />
        )}
      </label>
      <label>
        Select years of prediction:
        <input
          type="number"
          value={years}
          onChange={(e) => setYears(parseInt(e.target.value))}
          min="1"
          max="5"
        />
      </label>
      {!isValidStock && <p style={{ color: "red" }}>Invalid stock ticker</p>}
      <button onClick={handleForecast}>Get Forecast</button>
    </div>
  );
};

export default Stocks;
