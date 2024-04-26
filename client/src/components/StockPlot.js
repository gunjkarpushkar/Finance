import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-basic-dist';

/**
 * StockPlot is a React component that utilizes the Plotly library to render stock price data
 * visualizations. It receives a data object containing the necessary data and layout configuration
 * for Plotly to render the graph.
 *
 * @component
 * @param {Object} data - The data and layout settings for the Plotly graph.
 * @returns {React.Component} A div element that serves as the container for the Plotly graph.
 */
const StockPlot = ({ data }) => {
  /**
   * Reference to the container div for the Plotly graph. useRef is used to get direct access
   * to the DOM element for efficient rendering.
   * @type {React.RefObject<HTMLDivElement>}
   */
  const plotContainer = useRef(null);
  /**
   * useEffect hook to reactively update the Plotly graph whenever the data prop changes.
   * It ensures that the graph re-renders in response to data updates without requiring a full
   * component re-render, thus optimizing performance.
   */
  useEffect(() => {
    if (data) {
      // Use Plotly.react to efficiently update the graph with new data
      Plotly.react(plotContainer.current, data, {});
    }
  }, [data]);

  return <div ref={plotContainer} style={{ width: "100%", height: "100%" }} />;
};

export default StockPlot;
