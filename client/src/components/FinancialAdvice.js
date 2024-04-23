import React, { useState, useEffect } from "react";
import axios from 'axios';

function FinancialAdvice() {
    const [userIncome, setUserIncome] = useState(0);
    const [period, setPeriod] = useState('monthly');
    const [income, setIncome] = useState(0);
    const [transactions, setTransactions] = useState({});
    const [monthlyAdvice, setMonthlyAdvice] = useState([]);

    useEffect(() => {
        if (income > 0) {
            const fetchTransactions = async () => {
                try {
                    const { data } = await axios.get('/get_transaction_data');
                    console.log(data)
                    setTransactions(data);
                } catch (error) {
                    console.error('Failed to fetch transactions:', error);
                }
            };
            fetchTransactions();
        }
    }, [income]);

    useEffect(() => {
        if (income > 0) {
            console.log("Enterinign if statement")
            calculateBudget();
        }
    }, [income, transactions]);

    const handleIncomeSubmit = () => {
        const monthlyIncome = period === 'yearly' ? userIncome / 12 : userIncome;
        setIncome(monthlyIncome);
    };

    const calculateBudget = () => {
        console.log("Entering calulctae budget")
        const needsCategories = ['Gasoline', 'Education', 'Insurance', 'Services'];
        const wantsCategories = ['Merchandise', 'Restaurants', 'Travel/Entertainment'];
        const monthlyAdviceArray = [];

        Object.keys(transactions).forEach(month => {
            let totalNeeds = 0;
            let totalWants = 0;

            transactions[month].forEach(transaction => {
                console.log(transaction)
                if (needsCategories.includes(transaction.category)) {
                    totalNeeds += transaction.amount;
                } else if (wantsCategories.includes(transaction.category)) {
                    totalWants += transaction.amount;
                } else {
                    totalNeeds += transaction.amount
                }
            });

            const monthlyIncome = income;
            const budgetNeeds = monthlyIncome * 0.50;
            const budgetWants = monthlyIncome * 0.30;
            const investment = monthlyIncome * 0.20;

            const needsAdvice = `For ${month}, needs spending was ${totalNeeds <= budgetNeeds ? 'under' : 'over'} budget by $${Math.abs(totalNeeds - budgetNeeds).toFixed(2)}.`;
            const wantsAdvice = `For ${month}, wants spending was ${totalWants <= budgetWants ? 'under' : 'over'} budget by $${Math.abs(totalWants - budgetWants).toFixed(2)}.`;

            monthlyAdviceArray.push({ month, needsAdvice, wantsAdvice });
        });

        setMonthlyAdvice(monthlyAdviceArray);
    };

    return (
        <div>
            <h2>Enter your income and select the period:</h2>
            <input
                type="number"
                value={userIncome}
                onChange={(e) => setUserIncome(parseFloat(e.target.value))}
                placeholder="Enter your income"
            />
            <select value={period} onChange={(e) => setPeriod(e.target.value)}>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
            </select>
            <button onClick={handleIncomeSubmit}>Submit Income</button>
            <h2> We are going to be following the 50, 30, 20 rule when it comes to investment </h2>
            <h3> The 50, 30, 20 rule means that</h3>
            <h3> 50% of your money goes towards NEEDS, this would include Gasoline, Education, Insurance, etc </h3>
            <h3> 30% of your money goes towards WANTS, this would include Merchandise, Restaurants, Travel/Entertainment, etc</h3>
            <h3> 20% of your income needs to go toward investment STOCKS, BONDS, EFTS etc. This is what we will recommend</h3>
            <h2>Following the 50/30/20 Investment Rule</h2>
            <h2>Following the 50/30/20 Investment Rule</h2>
            <h2>This is your monthly income ${income.toFixed(2)}</h2>
            {monthlyAdvice.map((advice, index) => (
                <div key={index}>
                    <h4>{advice.month}</h4>
                    <p>{advice.needsAdvice}</p>
                    <p>{advice.wantsAdvice}</p>
                </div>
            ))}
        </div>
    );
}

export default FinancialAdvice;

