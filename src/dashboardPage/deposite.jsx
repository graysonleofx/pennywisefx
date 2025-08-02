import React from "react";
import { useState } from "react";
import DashBars from "./dash-bar";
import DashboardLayout from "./dashboardLayout"
import { useNavigate } from "react-router-dom";
import '../styles/dashboard.css'
import { set, ref, getDatabase, push } from "firebase/database";
import { getAuth } from "firebase/auth";

function DepositPage ({username, email}) {
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");  
  const [numberInput, setNumberInput] = useState('');
  const [paymentMethod, setpaymentMethod] = useState('');
  const [errors, setErrors] = useState({ numberInput: '', paymentMethod: '' });  
  const [message, setMessage] = useState('')

  const handleProccedPayment= (e) => { 
    e.preventDefault
    const newErrors = { numberInput: '', paymentMethod: '' };
    let isValid = true;

    // validate number input
    if(!numberInput){
      newErrors.numberInput = 'Enter amount to deposits.';  
      isValid = false;
    }else if(isNaN(numberInput) || numberInput < 50){
      newErrors.numberInput = 'Minimum deposits should be atleast $50.'; 
      isValid = false;  
    }
    if (!paymentMethod) {  
      newErrors.paymentMethod = 'Please select a payment method.';  
      isValid = false;  
    }  
    setErrors(newErrors);  

    if (isValid) { 
      const amount = parseFloat(numberInput);
      // console.log("Amount:", amount )
      if (isNaN(amount) || amount <= 0) {  
        setMessage('Please enter a valid amount.');  
        return;  
      } 
      const auth = getAuth();
      const userId = auth.currentUser.uid;
      const database = getDatabase();
      const transactionBaseRef = ref(database, `users/${userId}/transactions`);
      const transactionRef = push(transactionBaseRef);
      const transactionData = {
        amount,
        paymentMethod: selectedPaymentMethod,
        status: "Pending",
        transaction: 'deposits',
        date: new Date().toISOString()
      }
      if(transactionRef){
        set(transactionRef, transactionData)
        .then(() => {
          // console.log('transaction saved successfully')
          navigate('/dashboard/deposits/payment', { state: { selectedPaymentMethod, depositAmount: amount} }); //  Pass the selected payment method to the next page
        })
        .catch((error) => {
          console.error('Error saving transaction:', error);
        })
      }
    } 
  };

  const handleAmtChange = (event) => {  
    // const value = parseFloat();  
    setNumberInput(event.target.value);  
    // setAmount(event.target.value); // Update the parent with the new amount  
} ;

  // Handler function to update state when a radio button is selected  
  const handleChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
    setpaymentMethod(e.target.value);
  }

  return(
    <div>
    {/* for side bar  */}
    <div className="navigate-bars"> 
      <DashboardLayout username={username} email={email}/>     
      <div className="main">
        <div className="dashbord-ccontainer">
          <h2 className="welcome-heading">Fund Your Account</h2>

          <div className="account-container">
            <div className="amount-input-div">
              <h3>Amount</h3>
              <input type="number"  
                placeholder="Enter Amount to deposits" 
                value={numberInput}   
                onChange={handleAmtChange}
                required
                minLength='10'
              />
              {errors.numberInput && (  
                <span style={{ color: 'red', fontSize: '14px'}}>{errors.numberInput}</span>  // Display error for number input  
              )}  
            </div>

            <div className="choose-payment-div">
              <h3>Choose Payment Method from the list below</h3>

              <div className="payment-metthods">
                <div className="btc-div">
                  <input 
                    type="radio" 
                    name="currencies" 
                    value="Bitcoin"
                    checked = {selectedPaymentMethod === 'Bitcoin'}
                    onChange={(handleChange)}
                    min='10'
                  />
                  <img src="/icons/btc.png" alt="" width='25px'/>
                  <p>Bitcoin</p>
                </div>
                <div className="usdt-div">
                  <input 
                    type="radio" 
                    name="currencies" 
                    value='USDT (Trc20)'
                    checked = {selectedPaymentMethod === 'USDT (Trc20)'}
                    onChange={handleChange}
                    />
                  <img src="/icons/usdt.png" alt="" width='25px'/>
                  <p>USDT TRC20</p>
                </div>
                <div className="usdt-div">
                  <input 
                  type="radio" 
                  name="currencies" 
                  value='USDT (Erc20)'
                  checked = {selectedPaymentMethod === 'USDT (Erc20)'}
                  onChange={handleChange}
                  />
                  <img src="/icons/usdt.png" alt="" width='25px'/>
                  <p>USDT ERC20</p>
                </div>
                <div className="usdt-div">
                  <input 
                    type="radio" 
                    name="currencies" 
                    value='USDT (Bep20)'
                    checked = {selectedPaymentMethod === 'USDT (Bep20)'}
                    onChange={handleChange}
                    />
                  <img src="/icons/usdt.png" alt="" width='25px'/>
                  <p>USDT BEP20</p>
                </div>
                <div className="eth-div">
                  <input  
                    type="radio" 
                    name="currencies"
                    value='ETH (Erc20)'
                    checked = {selectedPaymentMethod == 'ETH (Erc20)'}
                    onChange={handleChange}
                    />
                  <img src="/icons/ethrum.png" alt="" width='25px'/>
                  <p>Etherum</p>
                </div> <br/>
              </div>
                <div style={{marginBottom: '20px'}}>
                  {errors.paymentMethod && (  
                    <span style={{ color: 'red', fontSize: '14px'}}>{errors.paymentMethod}</span>  
                  )} 
                </div>
              <button className="proceed-btn" onClick={handleProccedPayment}>Proceed Payment</button>
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
export default DepositPage;
