import React, { useState } from 'react';
import axios from 'axios';

/**
 * IncomeForm is a React component that provides a form for users to input their income and
 * select whether the income is calculated on a monthly or yearly basis. It handles the submission
 * of this data to a server endpoint and responds to the user based on the outcome of the submission.
 *
 * @component
 * @returns {React.Component} The IncomeForm component which allows users to enter and submit their income data.
 */
function IncomeForm() {
  /**
   * State to store the income value entered by the user.
   * @type {string}
   */
  const [income, setIncome] = useState('');
  /**
   * State to store the selected period for how often the user earns the entered income (monthly or yearly).
   * @type {string}
   */
  const [period, setPeriod] = useState('monthly');

  /**
   * Handles the form submission event. It posts the user's income and the period to a server endpoint
   * and handles the server response or errors accordingly.
   *
   * @param {React.FormEvent} event - The form event triggered on submission.
   */

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/get_income', { income, period });
      console.log('Server Response:', response.data);
      alert('Income submitted successfully');
    } catch (error) {
      console.error('Error posting income:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Enter Your Income</h1>
      <div>
        <label>
          Monthly
          <input
            type="radio"
            name="period"
            value="monthly"
            checked={period === 'monthly'}
            onChange={() => setPeriod('monthly')}
          />
        </label>
        <label>
          Yearly
          <input
            type="radio"
            name="period"
            value="yearly"
            checked={period === 'yearly'}
            onChange={() => setPeriod('yearly')}
          />
        </label>
      </div>
      <div>
        <label>
          Income: 
          <input 
            type="number"
            value={income}
            onChange={e => setIncome(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default IncomeForm;