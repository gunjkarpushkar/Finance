// DataFetcher.js
import React, { useState, useEffect } from 'react';
/**
 * DataFetcher is a utility React component designed to perform a side effect of fetching
 * data from a specified endpoint. It does not render any UI elements but rather uses the
 * useEffect hook to fetch data and invoke a callback function with the fetched data.
 * This component is ideal for scenarios where data needs to be fetched and passed to
 * parent components without any direct user interaction or display within this component itself.
 *
 * @component
 * @param {Function} onDataFetched - A callback function that is called with the fetched data.
 *                                   This function is responsible for handling the data in the
 *                                   context of the parent component.
 * @returns {null} Since it does not render any UI elements, it returns null.
 */
function DataFetcher({ onDataFetched }) {
    useEffect(() => {
        fetch('/get_transaction_data')
            .then(response => response.json())
            .then(data => {
                onDataFetched(data);  
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [onDataFetched]);

    return null; 
}

export default DataFetcher;