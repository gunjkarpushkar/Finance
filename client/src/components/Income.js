import React, { useState } from 'react';
import axios from 'axios';

function IncomeForm() {
  const [income, setIncome] = useState('');
  const [period, setPeriod] = useState('monthly');

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