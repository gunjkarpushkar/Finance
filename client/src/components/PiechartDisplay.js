import React from 'react';
import Plot from 'react-plotly.js';

function PieChartDisplay({ data }) {
    return (
        <div>
            {Object.entries(data).map(([month, dataEntries]) => (
                <div key={month}>
                    <h3>{month}</h3>
                    <Plot
                        data={[{
                            values: dataEntries.map(item => item.Amount),
                            labels: dataEntries.map(item => item.Category),
                            type: 'pie'
                        }]}
                        layout={{
                            title: `Spending Breakdown for ${month}`,
                            height: 400,
                            width: 500
                        }}
                    />
                </div>
            ))}
        </div>
    );
}

export default PieChartDisplay;