import React, { useEffect } from "react"
import { useState } from "react";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom"
import DashBars from "./dash-bar";
import DashboardLayout from "./dashboardLayout"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { 
  faMoneyBillTrendUp, faCoins,
  faMoneyBillAlt, faDatabase,
  faMoneyCheckAlt , faGift, faArrowUp
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import '../styles/dashboard.css'
import '../styles.css'

export default function Dashboard({username, totalProfit, totalDeposit, totalBouns, totalInvestment, totalWithdrawal, email}) {
// export default function Dashboard() {

  // currency format for dollar signs 
  const formatCurrency = (amount) => {  
    return amount.toLocaleString('en-US', {  
      style: 'currency',  
      currency: 'USD',  
      minimumFractionDigits: 2,  
      maximumFractionDigits: 2  
    });  
  };  

  // const userBalanceListeener = () =>{

  const [accountBalance, setAccountBalance] = useState(0);
  const [rewardBalance, setRewardBalance] = useState(0);
  const [profitBalance, setProfitBalance] = useState(0);
  const [bounsBalance, setBounsBalance] = useState(0);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const user = auth.currentUser;

    if (user){
      const database = getDatabase();
      const userRef = ref(database, 'users/' + user.uid);

      // listen for the Profit balance changes
      onValue(userRef, (snapshot) => {
        if(snapshot.exists()){
          const data = snapshot.val();
          const newProfitBalance = data.totalProfit;
          const newAccountBalance = data.totalDeposit + data.totalProfit + data.totalInvestment;
          const newBounsBalance = data.totalProfit;
          const newRewardBalance = data.totalReward;

          // update state 
          setProfitBalance(newProfitBalance);
          setAccountBalance(newAccountBalance);
          setRewardBalance(newRewardBalance)
          setBounsBalance(newBounsBalance)

          // update Account balance in the database
          update(userRef, {
            accountBalance: newAccountBalance
          })
        }
      });
    }
    }, [auth])
  // }

  const handleWithdrawBtn = () => {
    navigate('/dashboard/withdraw')
  }
  const handleInvestBtn = () => {
    navigate('/dashboard/invest')
  }
  const handleAllInvestBtn = () => {
    alert(`Not Available at the moment \n Please try Again Later!!!`);
    // navigate('/dashboard/invest/all-investment')
  }

  return(
   // for nav bar 
    <div>
    {/* for side bar  */}
    <div className="navigate-bars"> 
      <DashboardLayout username={username} email={email}/>     
      <div className="main">
        <div className="dashbord-ccontainer">
          <h2 className="welcome-heading">Welcome, {username} !</h2>

          <div className="Account-holding-div">
            <div className="total-deposit-div">
              <div className="img-div">
              <FontAwesomeIcon icon={faCoins } size="lg"/>
              </div>
              <div>
                <strong>
                {formatCurrency(totalDeposit)}</strong>
                <p className="totals-p"> Total Deposit</p>
              </div>
            </div>

            <div className="total-profit-div">
              <div className="img-div">
                <FontAwesomeIcon icon={faMoneyBillAlt} size="lg"/>
              </div>
              <div>
                <strong>{formatCurrency(totalProfit)}</strong>
                <p className="totals-p">Total Profit</p>
              </div>
            </div>

            <div className="acc-balance-div">
              <div className="img-div">
                <FontAwesomeIcon icon={faDatabase} size="lg"/>
              </div>
              <div>
                <strong>{formatCurrency(accountBalance)}</strong>
                <p className="totals-p">Account Balance</p>
              </div>
            </div>

            <div className="total-bonus-div">
              <div className="img-div">
                <FontAwesomeIcon icon={faGift} size="lg"/>
              </div>
              <div>
                <strong>{formatCurrency(totalBouns)}</strong>
                <p className="totals-p">Total Bouns</p>
              </div>
            </div>

            {/* <div className="total-referral-div">
              <div className="img-div">
                <img src="vite.svg" alt="downloadicon"/>
              </div>
              <div>
                <strong>$0.00</strong>
                <p className="totals-p">Total Referral Bonus</p>
              </div>
            </div> */}

            <div className="total-investment-plan-div">
              <div className="img-div">
                {/* <img src="vite.svg" alt="downloadicon"/> */}
                <FontAwesomeIcon icon={faMoneyBillTrendUp} size="lg"/>
              </div>
              <div>
                <strong>{formatCurrency(totalInvestment)}</strong>
                <p className="totals-p">Total Investment Plans</p>
              </div>
            </div>

            {/* <div className="active-investment-plan-div">
              <div className="img-div">
                <img src="vite.svg" alt="downloadicon"/>
              </div>
              <div>
                <strong>$0.00</strong>
                <p className="totals-p">Active Investment Plans</p>
              </div>
            </div> */}

            <div className="total-withdrawals-div">
              <div className="img-div">
                <FontAwesomeIcon icon={faMoneyCheckAlt} size="lg"/>
              </div>
              <div>
                <strong>{formatCurrency(totalWithdrawal)}</strong>
                <p className="totals-p">Total Withdrawals</p>
              </div>
            </div>
          </div>

          <div>
            <div className="balance-card">
              <div className="balance-acc-div">
                <p className="acc-bal-p">Balance in Account</p>
                <h2>{formatCurrency(accountBalance)}</h2>

                <div className="available-funds">
                  <p>Available funds</p>
                  <strong>{formatCurrency(totalDeposit + totalProfit)}</strong>
                </div>
                <div className="investment-funds">
                  <p>Investment funds</p>
                  <strong>{formatCurrency(totalInvestment)}</strong>
                </div>
                <div className="total-funds">
                  <p><strong>Total funds</strong></p>
                  <strong>{formatCurrency(totalDeposit + totalProfit + totalInvestment)}</strong>
                </div>
                <div className="funds-button">
                  <button id="desh-depos" onClick={handleWithdrawBtn}>Withdraw Funds</button>
                  <Link to='/dashboard/deposits' className=" depos-funds deposit-funds">Deposit Funds</Link>
                </div>
              </div>

              <div className="profit-acc-div">
                <p className="acc-bal-p">This Month Profit </p>
                <div className="profit-acc">
                  <h2>{formatCurrency(totalProfit)}</h2>
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faArrowUp} size="sm" color="green"/>
                    <p className="profit-per">4.5%</p>
                  </div>
                </div>

                <div className="available-funds">
                  <p>Profits</p>
                  <strong>{formatCurrency(totalProfit)}</strong>
                </div>
                <div className="investment-funds">
                  <p>Rewards</p>
                  <strong>$ 25.00</strong>
                </div>
                <div className="total-funds">
                  <p><strong>Total funds</strong></p>
                  <strong>{formatCurrency(totalProfit + 25)}</strong>
                </div>
                <div className="funds-button">
                  <button onClick={handleInvestBtn}>Invest & Earn</button>
                  <p className="deposit-funds">Earn up to 25$ each day!</p>
                </div>
              </div>

              <div className="my-investment-div">
                <p className="acc-bal-p">My Investment</p>
                <h2>0 Active</h2>

                <div className="available-funds">
                  <p>Silver </p>
                  <strong>0.00</strong>
                </div>
                <div className="investment-funds">
                  <p>Demond</p>
                  <strong>0.00</strong>
                </div>
                <div className="total-funds">
                  <p><strong>Total funds</strong></p>
                  <strong>0.00</strong>
                </div>
                <div className="funds-button">
                  <button onClick={handleAllInvestBtn}>All Investment</button>
                  <p className="deposit-funds">Check out Analytic Report</p>
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


      {/* <h1> Welcome, {username} Promo</h1> */}
      {/* <div>
        <h4>Account balance</h4>
        <p>$0.00</p>
        <h4>Total Profit</h4>
        <p>$0.00</p>
      </div> */}

    </div>
  )
  

}
