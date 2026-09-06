import React, { useEffect } from "react"
import { useState } from "react";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import DashboardLayout from "./dashboardLayout"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import candle from '../assets/candle.png';
import { 
  faMoneyBillTrendUp, faCoins,
  faMoneyBillAlt, faDatabase,
  faMoneyCheckAlt , faGift
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import '../styles/dashboard.css'
import '../styles.css'
import CryptoLiveChart from "./CryptoLiveChart";
import PortfolioSection from "./PortfolioSection";


export default function Dashboard({username, totalProfit, totalDeposit, totalBouns, totalInvestment, totalWithdrawal, email, transactions = []}) {
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
              <div>
              
                <div className="img-div">
                <FontAwesomeIcon icon={faCoins } size="lg"/>
                </div>

                <div>
                  <strong>
                  {formatCurrency(totalDeposit)}</strong>
                  <p className="totals-p"> Total Deposit</p>
                </div>
              </div>

              <div className="candlestick-div" width="100" height="100">
                <img src={candle} alt="Candlestick" width="100" height="100"/>
              </div>
            </div>
            
            <div className="total-profit-div">
              <div>
                <div className="img-div">
                  <FontAwesomeIcon icon={faMoneyBillAlt} size="lg"/>
                </div>
                <div>
                  <strong>{formatCurrency(totalProfit)}</strong>
                  <p className="totals-p">Total Profit</p>
                </div>
              </div>

              <div className="candlestick-div" width="100" height="100">
                <img src={candle} alt="Candlestick" width="100" height="100"/>
              </div>
            </div>
            
            <div className="acc-balance-div">
              <div>
                <div className="img-div">
                  <FontAwesomeIcon icon={faDatabase} size="lg"/>
                </div>
                <div>
                  <strong>{formatCurrency(accountBalance)}</strong>
                  <p className="totals-p">Account Balance</p>
                </div>
              </div>

              <div className="candlestick-div" width="100" height="100">
                <img src={candle} alt="Candlestick" width="100" height="100"/>
              </div>
            </div>
            
            <div className="total-bonus-div">
              <div>
                <div className="img-div">
                  <FontAwesomeIcon icon={faGift} size="lg"/>
                </div>
                <div>
                  <strong>{formatCurrency(totalBouns)}</strong>
                  <p className="totals-p">Total Bouns</p>
                </div>
              </div>

              <div className="candlestick-div" width="100" height="100">
                <img src={candle} alt="Candlestick" width="100" height="100"/>
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
              <div>
                <div className="img-div">
                  {/* <img src="vite.svg" alt="downloadicon"/> */}
                  <FontAwesomeIcon icon={faMoneyBillTrendUp} size="lg"/>
                </div>
                <div>
                  <strong>{formatCurrency(totalInvestment)}</strong>
                  <p className="totals-p">Total Investment </p>
                </div>
              </div>

              <div className="candlestick-div" width="100" height="100">
                <img src={candle} alt="Candlestick" width="100" height="100"/>
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

              <div>
                <div className="img-div">
                  <FontAwesomeIcon icon={faMoneyCheckAlt} size="lg"/>
                </div>
                <div>
                  <strong>{formatCurrency(totalWithdrawal)}</strong>
                  <p className="totals-p">Total Withdrawal</p>
                </div>
              </div>

              <div className="candlestick-div" width="100" height="100">
                <img src={candle} alt="Candlestick" width="100" height="100"/>
              </div>
            </div>
          </div>

          

          <div>
            <div className="chart-container">
              <CryptoLiveChart />
            </div>

            <PortfolioSection
              totalProfit={totalProfit}
              totalDeposit={totalDeposit}
              totalInvestment={totalInvestment}
              transactions={transactions}
              onInvest={handleInvestBtn}
              onWithdraw={handleWithdrawBtn}
            />
            {/* copyright seciton  */}
            <div className="dashboard-copyright-div">
              <p>All Rights Reserved © Pennywise FX {new Date().getFullYear()} </p>
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
