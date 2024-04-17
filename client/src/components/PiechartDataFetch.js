// DataFetcher.js
import React, { useState, useEffect } from 'react';

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