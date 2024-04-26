// SimplePieChart.js
import React from 'react';
import Plot from 'react-plotly.js';

/**
 * SimplePieChart is a React component that displays a simple pie chart.
 * It takes predefined data and layout properties to render the chart.
 *
 * @component
 * @returns {JSX.Element} A React component that renders a simple pie chart.
 */
function SimplePieChart() {
    /**
     * Data for the pie chart.
     * @type {Array<Object>}
     */
    const data = [{
        values: [450, 300, 150, 100],
        labels: ['Travel/entertainment', 'Services', 'Groceries', 'Medical'],
        type: 'pie'
    }];

    /**
     * Layout properties for the pie chart.
     * @type {Object}
     */
    const layout = {
        height: 400,
        width: 500,
        title: 'December Spending'
    };

    /**
     * Renders the simple pie chart using Plot component.
     * @returns {JSX.Element} A React component that renders a simple pie chart.
     */
    return (
        <Plot
            data={data}
            layout={layout}
        />
    );
}

export default SimplePieChart;
