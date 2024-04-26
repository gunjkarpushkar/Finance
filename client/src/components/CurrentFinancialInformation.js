
import React, { useState } from "react";
import DataFetcher from "../components/PiechartDataFetch";
import PieChartDisplay from "../components/PiechartDisplay";
import BarChartDisplay from "../components/BarChartDisplay";

/**
 * CurrentFinancialInformation is a React component that serves as a container for financial data
 * visualizations, including pie charts and bar charts. It uses a DataFetcher component to retrieve
 * the transaction data which is then passed to PieChartDisplay for rendering a pie chart.
 * Additionally, it renders a BarChartDisplay which independently fetches and displays its data.
 *
 * @component
 * @returns {React.Component} Renders a container with financial data visualizations including pie and bar charts.
 */

function CurrentFinancialInformation() {

    /**
     * State to store the transaction data retrieved from the DataFetcher component.
     * This data is used to feed the PieChartDisplay component.
     * @type {Object}
     */
    const [transactionData, setTransactionData] = useState({});

    return (
        <div>
            <DataFetcher onDataFetched={setTransactionData} />
            <PieChartDisplay data={transactionData} />
            <BarChartDisplay/>
        </div>
    )
}



export default CurrentFinancialInformation
