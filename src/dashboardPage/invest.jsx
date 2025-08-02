import React from "react";
import DashBars from "./dash-bar";
import { getDatabase, onValue, ref } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/dashboard.css'

function InvestPage ({username, email}) {
  const navigate = useNavigate()
  const [baseInput, setBaseInput] =  useState('');
  const [silverInput, setSilverInput] =  useState('');
  const [goldInput, setGoldInput] =  useState('');
  const [errors, setErrors] = useState({ baseInput: '', silverInput: '', goldInput: ''}); 
  const newErrors = { baseInput: '', silverInput: '', goldInput: ''};
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [message, setMessage] = useState('')
  let isValid = true;

  const auth = getAuth()
  const user = auth.currentUser;  
  useEffect(() => { 
    if (user) {  
      const database = getDatabase()
      const balanceRef = ref(database, `users/${user.uid}/totalDeposit`);   
       
      const unsubscribe = onValue(balanceRef, (snapshot) => {
        if (snapshot.exists()) {  
          setTotalDeposit(snapshot.val());  
        } else {  
          console.log('No data available');  
        }  
      }, (error) => {
        console.error('Error fetching balance:', error); 
      })  
      // Cleanup listener on unmount  
      return () => unsubscribe();   
    }  
  }, [auth.currentUser]);  


  const handleBasicPlan = () => {
    if(!baseInput){
      newErrors.baseInput = 'Enter amount to Invest.';  
      isValid = false;
    }else if(isNaN(baseInput) || baseInput < 200){
      newErrors.baseInput = 'Minimum Invest  amount should be at least $200.'; 
      isValid = false; 
    }else if(isNaN(baseInput) || baseInput > 999){
      newErrors.baseInput = 'Maximum Invest  amount should be $999.'; 
      isValid = false; 
    }
    setErrors(newErrors)
    if(isValid){
      setBaseInput('')
      const amount = parseFloat(baseInput);

      if(isNaN(amount) || amount <= 0){
        setMessage('Please enter a valid amount.');  
        return; 
      }
      if (amount > totalDeposit) {  
        setMessage('Insufficient balance.');  
        alert('Insufficient Balance');
        navigate('/dashboard/deposits');
        return;
      }
    }
  }

  const handleSliverPlan = () => {
    if(!silverInput){
      newErrors.silverInput = 'Enter amount to Invest.';  
      isValid = false;
    }else if(isNaN(silverInput) || silverInput < 1000){
      newErrors.silverInput = 'Minimum Invest  amount should be at least $1000.'; 
      isValid = false; 
    }else if(isNaN(silverInput) || silverInput > 4999){
      newErrors.silverInput = 'Maximum Invest  amount should be $4999.'; 
      isValid = false; 
    }
    setErrors(newErrors);
    if(isValid){
      setSilverInput('')
      const amount = parseFloat(silverInput);

      if(isNaN(amount) || amount <= 0){
        setMessage('Please enter a valid amount.');  
        return; 
      }
      if (amount > totalDeposit) {  
        setMessage('Insufficient balance.');  
        alert('Insufficient Balance');
        navigate('/dashboard/deposits')
        return;
      }
    }
  }

  const handleGoldPlan = () => {
    if(!goldInput){
      newErrors.goldInput = 'Enter amount to Invest.';  
      isValid = false;
    }else if(isNaN(goldInput) || goldInput < 5000){
      newErrors.goldInput = 'Minimum Invest  amount should be at least $5000.'; 
      isValid = false; 
    }else if(isNaN(goldInput) || goldInput > 9000){
      newErrors.goldInput = 'Maximum Invest  amount should be $9000.'; 
      isValid = false; 
    }
    setErrors(newErrors);
    if(isValid){
      setGoldInput('')
      const amount = parseFloat(goldInput);

      if(isNaN(amount) || amount <= 0){
        setMessage('Please enter a valid amount.');  
        return; 
      }
      if (amount > totalDeposit) {  
        setMessage('Insufficient balance.');  
        alert('Insufficient Balance');
        navigate('/dashboard/deposits')
        return;
      }
    }
  }

  return(
    <div>
    {/* for side bar  */}
    <div className="navigate-bars"> 
      <DashBars username={username} email={email}/>     
      <div className="main">
        <div className="dashbord-ccontainer">
          <h2 className="welcome-heading">Investment Plan</h2>

          <div className="investment-container">
            <div className="choose-payment-div">
              <h3>Choose your investment plan and start earning.</h3>

              <div className="balance-card invest-card">
                <div className="balance-acc-div invest-acc-div">
                  <h2 id="invest-start">Basic Plan</h2>
                  <p className="acc-bal-p invest-paragraph">Enjoy entry level of invest & earn</p>
                  <div className="invest-percent-div">
                    <div>
                      <h2 id="invest-start">1.67%</h2>
                      <p className="acc-bal-p iinvest-paragraph">Daily Interest</p>
                    </div>
                    <div>
                      <h2 id="invest-start">30</h2>
                      <p className="acc-bal-p iinvest-paragraph">Term Days</p>
                    </div>

                  </div>

                  <div className="available-funds">
                    <p>Min Deposits</p>
                    <strong>$200.00</strong>
                  </div>
                  <div className="investment-funds invest-max-funds">
                    <p>Max Deposits</p>
                    <strong>$999.00</strong>
                  </div>
                  <div className="deposits-return">
                    <p>Deposits Return</p>
                    <strong>Yes</strong>
                  </div>
                  <div className="total-funds">
                    <p><strong>Total Return</strong></p>
                    <strong>125%</strong>
                  </div>
                  <div className="funds-button">
                    <input 
                      type="number" 
                      placeholder="Enter amount" className="invest-amt"
                      value={baseInput}
                      onChange={(e) => setBaseInput(e.target.value)}
                    />
                    {errors. baseInput && (
                      <span 
                       className="error-message-iv">
                        {errors.baseInput}
                      </span>
                    )}
                    {message && (
                      <span 
                      className="error-message-iv">
                        {message}
                      </span>
                    )} 
                    <button className="invest-btn" onClick={handleBasicPlan}>Invest</button>
                  </div>
                </div>

                {/* for sliver plans  */}
                <div className="balance-acc-div invest-acc-div">
                  <h2 id="invest-start">Sliver</h2>
                  <p className="acc-bal-p invest-paragraph">Best plan for user to investers</p>
                  {/* <h2>$25,500.00</h2> */}
                  <div className="invest-percent-div">
                    <div>
                      <h2 id="invest-start">4.76%</h2>
                      <p className="acc-bal-p iinvest-paragraph">Daily Interest</p>
                    </div>
                    <div>
                      <h2 id="invest-start">21</h2>
                      <p className="acc-bal-p iinvest-paragraph">Term Days</p>
                    </div>

                  </div>

                  <div className="available-funds">
                    <p>Min Deposits</p>
                    <strong>$1000.00</strong>
                  </div>
                  <div className="investment-funds invest-max-funds">
                    <p>Max Deposits</p>
                    <strong>$4999.00</strong>
                  </div>
                  <div className="deposits-return">
                    <p>Deposits Return</p>
                    <strong>Yes</strong>
                  </div>
                  <div className="total-funds">
                    <p><strong>Total Return</strong></p>
                    <strong>200%</strong>
                  </div>
                  <div className="funds-button">
                    <input 
                      type="number" placeholder="Enter amount" className="invest-amt"
                      value={silverInput}
                      onChange={(e) => setSilverInput(e.target.value)}
                    />
                    {errors. silverInput && (
                      <span className="error-message-iv">
                        {errors.silverInput}
                      </span>
                    )}
                    {message && (
                      <span 
                      className="error-message-iv">
                        {message}
                      </span>
                    )}
                    <button className="invest-btn" onClick={handleSliverPlan}>Invest</button>
                  </div>
                </div>

                {/* for Gold plans  */}
                <div className="balance-acc-div invest-acc-div">
                  <h2 id="invest-start">Gold</h2>
                  <p className="acc-bal-p invest-paragraph">Advance level of invest & earn</p>
                  {/* <h2>$25,500.00</h2> */}
                  <div className="invest-percent-div">
                    <div>
                      <h2 id="invest-start">14.29%</h2>
                      <p className="acc-bal-p iinvest-paragraph">Daily Interest</p>
                    </div>
                    <div>
                      <h2 id="invest-start">14</h2>
                      <p className="acc-bal-p iinvest-paragraph">Term Days</p>
                    </div>

                  </div>

                  <div className="available-funds">
                    <p>Min Deposits</p>
                    <strong>$5000.00</strong>
                  </div>
                  <div className="investment-funds invest-max-funds">
                    <p>Max Deposits</p>
                    <strong>$9000.00</strong>
                  </div>
                  <div className="deposits-return">
                    <p>Deposits Return</p>
                    <strong>Yes</strong>
                  </div>
                  <div className="total-funds">
                    <p><strong>Total Return</strong></p>
                    <strong>125%</strong>
                  </div>
                  <div className="funds-button">
                    <input 
                      type="number" 
                      placeholder="Enter amount" 
                      className="invest-amt"
                      value={goldInput}
                      onChange={(e) => setGoldInput(e.target.value)}
                    />
                    {errors. goldInput && (
                      <span 
                      className="error-message-iv">
                        {errors.goldInput}
                      </span>
                    )}
                    {message && (
                      <span 
                      className="error-message-iv">
                        {message}
                      </span>
                    )}
                    <button className="invest-btn" onClick={handleGoldPlan}>Invest</button>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* copyright seciton  */}
          <div className="dashboard-copyright-div">
            <p>All Rights Reserved © Pennywise FX 2025</p>
          </div>
        </div>
      </div>
    </div>

    </div>
  )
}
export default InvestPage;