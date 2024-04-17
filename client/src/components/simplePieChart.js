// SimplePieChart.js
import React from 'react';
import Plot from 'react-plotly.js';

function SimplePieChart() {
    const data = [{
        values: [450, 300, 150, 100],
        labels: ['Travel/entertainment', 'Services', 'Groceries', 'Medical'],
        type: 'pie'
    }];

    const layout = {
        height: 400,
        width: 500,
        title: 'December Spending'
    };

    return (
        <Plot
            data={data}
            layout={layout}
        />
    );
}

export default SimplePieChart;
