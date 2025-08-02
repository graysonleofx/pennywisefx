import React from 'react'
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, } from 'firebase/database';
// import NavigationBar from './pages/Navbar'
import LandingPage from './pages/home';
import AboutUs from './pages/about';
import ContactUs from './pages/contact';
import SignInUser from './pages/Sign in';
import SignUpUser from './pages/sign-up';
import Dashboard from './dashboardPage/dashboard';
import DashboardLayout from './dashboardPage/dashboardLayout';
import DepositPage from './dashboardPage/deposite';
import ProtectedRoute from './component/protectedRoute';
import MakePayment from './dashboardPage/makePayment';
// import WithdrawalPage from './dashboardPage/withdraw';
import MakeWithdrawalPayment from './dashboardPage/withdrawalPayment';
import InvestPage from './dashboardPage/invest';
import AllInvestments from './dashboardPage/all-investment';
import TransactionPage from './dashboardPage/transations';
import SupportPage from './dashboardPage/support';
// import './App.css'

import LiveEvents from './pages/liveEvents';

function App() {
  const [username, setUsername] = useState('');
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalBouns, setTotalBouns] = useState(0)
  const [totalInvestment, setTotalInvestment] = useState(0)
  const [totalWithdrawal, setTotalWithdrawal] = useState(0)
  const [email, setEmail] = useState('')
  const [transactionHistory, setTransactionHistory] = useState([]); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [amount, setAmountDpo] = useState('')

  // const handleDepositChange = (amount) => {  
  //   setAmountDpo(amount);  
  // }; 
  
  const auth = getAuth();  

  useEffect(() => {  
    const unsubscribe = onAuthStateChanged(auth, async(user) => {  
      if (user) {  
        // User is signed in, set the logged-in state  
        setIsLoggedIn(true);  
        setUsername(user.username);
        setEmail(user.email);

        await fetchUserData(user.uid);
      } else {  
        // User is signed out  
        setIsLoggedIn(false);  
        resetUserData()
      }  
    });  

    // Cleanup subscription on unmount  
    return () => unsubscribe();  
  }, [auth]);  

  const fetchUserData = async (userId) => {
    try{
      const database = getDatabase();
      const userRef = ref(database, `users/${userId}`);
      // const userDataSnapshot = await get (userRef);
      onValue(userRef, (userDataSnapshot) => {
        const userData = userDataSnapshot.val();  
        if (userData) {  
          setTotalProfit(userData.totalProfit);  
          setTotalDeposit(userData.totalDeposit);  
          setTotalBouns(userData.totalBouns);  
          setTotalInvestment(userData.totalInvestment);  
          setTotalWithdrawal(userData.totalWithdrawal);  
          setTransactionHistory(userData.transactions || []); 

          const transactionRef = ref(database, `users/${userId}/transactions`);  
          onValue(transactionRef, (snapshot) =>{
            const transactions = [];
            snapshot.forEach(childSnapshot => {  
              transactions.push({ id: childSnapshot.key, ...childSnapshot.val() });  
            }); 
            setTransactionHistory(transactions);  
          }) 
        }  
      })

    } catch (error) {  
      console.error("Error fetching user data:", error);  
    } 
  }
  const resetUserData = () => {
    setUsername(''); 
    setTotalProfit(0);
    setTotalDeposit(0);
    setTotalBouns(0);
    setTotalInvestment(0);
    setTotalWithdrawal(0); 
    setEmail('');
    setTransactionHistory([]);
  }
  
  
  const handleLoggedIn = (username, totalProfit, totalDeposit, totalBouns, totalInvestment, totalWithdrawal) => {
    setUsername(username);
    setTotalProfit(totalProfit);
    setTotalDeposit(totalDeposit);
    setTotalBouns(totalBouns);
    setTotalInvestment(totalInvestment);
    setTotalWithdrawal(totalWithdrawal);
    setIsLoggedIn(true);
  }

  const handleSignOut = () => {  
    setIsLoggedIn(false);  
    resetUserData()
  };


  return (
    <div>  
      <Routes>  
        <Route path='/' element={<LandingPage />} />  
        <Route path="/about" element={<AboutUs />} />  
        <Route path="/contact-us" element={<ContactUs />} />  
        <Route path='/sign-in' element={<SignInUser onLogin={handleLoggedIn} />} />  
        <Route path='/sign-up' element={<SignUpUser />} />  
        <Route   
          path='/dashboard'   
          element={  
            <ProtectedRoute isLoggedIn={isLoggedIn}>  
              <DashboardLayout username={username} email={email}/>  
              <Dashboard   
                username={username}   
                totalProfit={totalProfit}   
                totalDeposit={totalDeposit}   
                totalBouns={totalBouns}   
                totalInvestment={totalInvestment}   
                totalWithdrawal={totalWithdrawal} 
                email={email}  
                onSignOut={handleSignOut}
              />  
            </ProtectedRoute>  
          }   
        /> 
        <Route   
          path='/dashboard/deposits'   
          element={  
            <ProtectedRoute isLoggedIn={isLoggedIn}>  
              <DepositPage   
                username={username}   
                email={email}  
                onSignOut={handleSignOut}   
              />  
            </ProtectedRoute>  
          }  
        /> 
        <Route   
          path='/dashboard/deposits/payment'   
          element={  
            <ProtectedRoute isLoggedIn={isLoggedIn}>  
              <MakePayment   
                username={username}   
                email={email}
                onSignOut={handleSignOut}   
              />  
            </ProtectedRoute>  
          }  
        /> 
        <Route   
          path='/dashboard/withdraw'   
          element={  
            <ProtectedRoute isLoggedIn={isLoggedIn}>  
              <MakeWithdrawalPayment   
                username={username}   
                email={email}  
                onSignOut={handleSignOut}   
              />  
            </ProtectedRoute>  
          }  
        /> 
        {/* <Route   
          path='/dashboard/withdraw/payment'   
          element={  
            <ProtectedRoute isLoggedIn={isLoggedIn}>  
              <MakeWithdrawalPayment   
                username={username}   
                email={email}   
                onSignOut={handleSignOut}   
              />  
            </ProtectedRoute>  
          }  
        /> */}
        <Route   
          path='/dashboard/invest'   
          element={  
            <ProtectedRoute isLoggedIn={isLoggedIn}>  
              <InvestPage   
                username={username}   
                email={email}   
                onSignOut={handleSignOut}   
              />  
            </ProtectedRoute>  
          }  
        />
        <Route   
          path='/dashboard/invest/all-investment'   
          element={  
            <ProtectedRoute isLoggedIn={isLoggedIn}>  
              <AllInvestments   
                username={username}   
                email={email}   
                onSignOut={handleSignOut}   
              />  
            </ProtectedRoute>  
          }  
        />
        <Route   
          path='/dashboard/transations'   
          element={  
            <ProtectedRoute isLoggedIn={isLoggedIn}>  
              <TransactionPage   
                username={username}   
                email={email} 
                transactions={transactionHistory}  
                onSignOut={handleSignOut}   
              />  
            </ProtectedRoute>  
          }  
        />
        <Route   
          path='/dashboard/support'   
          element={  
            <ProtectedRoute isLoggedIn={isLoggedIn}>  
              <SupportPage   
                username={username}   
                email={email}   
                onSignOut={handleSignOut}   
              />  
            </ProtectedRoute>  
          }  
        />
      </Routes>  

      <LiveEvents />
    </div>  
  );
};
export default App
