/**
 * Reports web vital metrics using the provided onPerfEntry callback.
 * Utilizes web-vitals library to measure Core Web Vitals.
 * 
 * @param {Function} onPerfEntry - Callback function to receive web vitals metrics.
 */
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
