import React from "react";
import { useState, useEffect } from "react";
import DashBars from "./dash-bar";
import { ref, set, push, getDatabase, onValue, runTransaction } from 'firebase/database'; 
import { getAuth } from "firebase/auth";

function MakeWithdrawalPayment ({username, email}) {
  const [totalProfit, setTotalProfit] = useState(0); 
  const [withdrawAmount, setWithdrawAmount] = useState('');  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(""); 
  const [btcInput, setBtcInput] = useState('');  
  const [message, setMessage] = useState('');
  const auth = getAuth();
  const [errors, setErrors] = useState({ withdrawAmount: '', btcInput: ''});  
  
  useEffect(() => { 
    const user = auth.currentUser;  
    if (user) {  
      const database = getDatabase()
      const balanceRef = ref(database, `users/${user.uid}/totalProfit`);   
       
      const unsubscribe = onValue(balanceRef, (snapshot) => {
        if (snapshot.exists()) {  
          setTotalProfit(snapshot.val());  
        } else {  
          console.log('No data available');  
        }  
      }, (error) => {
        console.error('Error fetching balance:', error); 
      })  
      // Cleanup listener on unmount  
      return () => unsubscribe();   
    }  
    fetchTransactionHistory()
  }, [auth.currentUser]);  
  
  const handleChange = (event) => {  
    setSelectedPaymentMethod(event.target.value);
}; 

  const handleWithdraw = () => {
    const newErrors = { withdrawAmount: '', btcInput: ''};
    let isValid = true;
  
    // validate number input
    if(!withdrawAmount){
      newErrors.withdrawAmount = 'Enter amount to withdraw.';  
      isValid = false;
    }else if(isNaN(withdrawAmount) || withdrawAmount < 50){
      newErrors.withdrawAmount = 'Minimum withdraw should be atleast $50.'; 
      isValid = false; 
    }
    if (!btcInput) {  
      newErrors.btcInput = 'Please Enter your Bitcoin wallet';  
      isValid = false;  
    }
    // else if(!btcInput < 34){
    //   newErrors.btcInput = 'Invaid Bitcoin wallet';  
    //   isValid = false;  
    // }
    setErrors(newErrors)

    if(isValid){
      const amount = parseFloat(withdrawAmount);
      
      if (isNaN(amount) || amount <= 0) {  
        setMessage('Please enter a valid amount.');  
        return;  
      }  
      
      if (amount > totalProfit ) {  
        setMessage('Insufficient balance.');  
        return;
      }
      // else{
        const userId = auth.currentUser.uid; 
        const database = getDatabase()
        const balanceRef = ref(database, `users/${userId}/totalProfit`); 
  
        runTransaction(balanceRef, (currentTotalProfit)=>{
          if(currentTotalProfit === null){
            // Handle it in case the balance does not exist  
            return null;
          }
          const newBalance = currentTotalProfit - amount;  
          return newBalance >=0 ? newBalance : currentTotalProfit;
        })  
        .then((result) => {  
          if(result !== null) {
            const transactionBaseRef = ref(database, `users/${userId}/transactions`);
            const transactionRef = push(transactionBaseRef);

            const transactionData = {
              amount: amount,
              paymentMethod: selectedPaymentMethod,
              status: "Pending",
              transaction: 'withdraw',
              date: new Date().toISOString()

            }
            if(transactionRef){
              set(transactionRef, transactionData)
              // .then(() => {
              //   return transactionRef.update({ status: 'Completed' });
              // })
              .then(() => {
                setMessage('Withdrawal successful!');  
                setWithdrawAmount('');  
                setBtcInput('');  
                // fetchTransactionHistory();
              })
              .catch(error => {
                console.error('Error saving transaction:', error);  
                setMessage('Withdrawal successful, but error saving transaction.');  
              })
            }            

            // const transactionId = push(transactionRef).key;

            // const transactionData = {
            //   amount: amount,
            //   paymentMethod: 'Bitcoin',
            //   status: "Pending",
            //   transaction: 'withdraw',
            //   date: new Date().toISOString
            // };
            
            // set(transactionRef, transactionId, transactionData).then(() => {
            //   setMessage('Withdrawal successful!');  
            //   setWithdrawAmount('');  
            //   setBtcInput('');  
            //   fetchTransactionHistory();
            // }).catch(error => {
            //   console.error('Error saving transaction:', error);  
            //   setMessage('Withdrawal successful, but error saving transaction.');  
            // })
          }else{
            setMessage('Error processing withdrawal.')
          }
          // setAccountBalance(newBalance);  
        })  
        .catch((error) => {  
          console.error('Transacation failed:', error);  
          setMessage('Error processing withdrawal.');  
        });  
      // }
    }

  }

  return(
    <div>
      {/* for side bar  */}
      <div className="navigate-bars"> 
        <DashBars username={username} email={email}/>     
        <div className="main">
          <div className="dashbord-ccontainer mk-pymt-container">
            <h2 className="welcome-heading mk-pm-h2">Happy Withdraw!</h2>

            <div className="make-payment-container witdrw-pymt-div">
              <h4>
              Your Payment Method is Bitcoin.
              </h4>
              <div className="selected-pm">
                <img src="/icons/btc.png" alt="" width='25px'/>
                <p>BITCOIN</p>
              </div>

              <div className="wallet-address-and-proof">
                {/* <h3>Bitcoin Wallet Address:</h3> */}

                <div className="wallet-address witdrw-div">
                  <label>Enter Amount to withdraw</label>
                  <input 
                    type="number" 
                    placeholder="Enter Amount" className="wallet-input"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                  />
                  {errors.withdrawAmount && (  
                  <span style={{ color: 'red', fontSize: '13px', marginTop: '-10px', marginBottom: '10px'}}>{errors.withdrawAmount}</span>  // Display error for number input  
                  )}
                  <label>Select Payment Method</label>
                  <select className="select-payment wallet-input" value={selectedPaymentMethod} onChange={handleChange}>
                    <option value='' disabled>Select Payment Method</option>
                    <option value='USDT'>USDT</option>
                    <option value="Bitcoin">Bitcoin</option>
                  </select>

                  <label>Enter Wallet Address</label>
                  <input 
                    type="text" 
                    placeholder="wallet address" className="wallet-input"
                    value={btcInput}
                    onInput={(e) => {
                      if(e.target.value.length > 34){
                        e.target.value = e.target.value.substring(0, 34)
                      }
                    }}
                    onChange={(e) => setBtcInput(e.target.value)}
                  />
                  {errors.btcInput && (  
                  <span style={{ color: 'red', fontSize: '13px', marginTop: '-10px', marginBottom: '10px'}}>{errors.btcInput}</span>  // Display error for number input  
                  )}
                </div>
                <button className="make-payment" onClick={handleWithdraw}>Withdraw</button>
                {message && <p style={{color: 'yellowgreen', fontSize: '13px', marginTop:'20px'}}>{message}</p>}  
              </div>

            </div>
              {/* copyright seciton  */}
              <div className="dashboard-copyright-div mk-pm-cpr">
                <p>All Rights Reserved © Pennywise FX 2025</p>
              </div>
          </div>
        </div>
      </div>

      
    </div>
  )
}
export default MakeWithdrawalPayment;