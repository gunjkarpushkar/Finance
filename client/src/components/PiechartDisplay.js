import React from 'react';
import Plot from 'react-plotly.js';

function PieChartDisplay({ data }) {
    const monthNames = {
        '1': 'January', '2': 'February', '3': 'March', '4': 'April',
        '5': 'May', '6': 'June', '7': 'July', '8': 'August',
        '9': 'September', '10': 'October', '11': 'November', '12': 'December'
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-around' }}>
            {Object.entries(data).map(([month, dataEntries]) => (
                <div key={month} style={{ flex: '1 0 300px', margin: '20px', boxSizing: 'border-box' }}>
                    <h3>{month}</h3>
                    <Plot
                        data={[{
                            values: dataEntries.map(item => item.Amount),
                            labels: dataEntries.map(item => item.Category),
                            type: 'pie'
                        }]}
                        layout={{
                            title: `Spending for ${monthNames[month]}`,
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