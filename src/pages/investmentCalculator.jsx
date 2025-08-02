// Create a React component called InvestmentCalculator a uniqie and responsive design that matches our project
// It should accept investment amount, select plan (Basic Plan, Sliver plan,  Gold plan)
// Each plan has a % rate and duration based on the plan selected
// The component should calculate the return based on the amount, plan rate and duration
// Calculate and show the return
import React, { useState } from 'react';
import '../styles/investmentCalculator.css';

const InvestmentCalculator = () => {
  const [amount, setAmount] = useState('');
  const [plan, setPlan] = useState('Basic Plan');
  const [returnAmount, setReturnAmount] = useState(null);

    const plans = {
      'Basic Plan': { rate: 5, duration: 12 },
      'Silver Plan': { rate: 7, duration: 24 },
      'Gold Plan': { rate: 10, duration: 36 },
    };

    const calculateReturn = () => {
      const selectedPlan = plans[plan];
      const interest = (amount * selectedPlan.rate * selectedPlan.duration) / 100;
      setReturnAmount(parseFloat(amount) + interest);
    };

    return (
      <div className="investment-calculator">
        <h2>Investment Calculator</h2>
        <div className="form-group">
          <label htmlFor="amount">Investment Amount:</label>
          <input
            type="number"
            id="amount"
            placeholder='Enter Amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="plan">Select Plan:</label>
          <select
            id="plan"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
          >
            {Object.keys(plans).map((planName) => (
              <option key={planName} value={planName}>
                {planName}
              </option>
            ))}
          </select>
        </div>
        <button className='calcu-btn' onClick={calculateReturn}>Calculate Return</button>
        {returnAmount !== null && (
          <div className="result">
            <h3>Estimated Return:</h3>
            <p>{returnAmount.toFixed(2)} USD</p>
          </div>
        )}
    </div>
  );
};

export default InvestmentCalculator;