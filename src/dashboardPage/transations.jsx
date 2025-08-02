import DashBars from "./dash-bar";
import '../styles/dashboard.css'

// function TransactionPage ({username, email, transactions = []}) {
function TransactionPage ({username, email, transactions = []}) {
  // console.log(transactions)
  // const [transactions, setTransaction] = useState([]);

  // const fetchUserData = async (userId) => {
  //   try{
  //     // const auth = getAuth();
  //     const database = getDatabase()
  //     // const userId = auth.currentUser.uid;
  //     const userDataSnapshot = await ref(database, `users/${userId}`).once('value');
  //     const userData = userDataSnapshot.val();  

  //     if (userData) {  
  //       setTotalProfit(userData.totalProfit);  
  //       setTotalDeposit(userData.totalDeposit);  
  //       setTotalBouns(userData.totalBouns);  
  //       setTotalInvestment(userData.totalInvestment);  
  //       setTotalWithdrawal(userData.totalWithdrawal);  
  //       setTransaction(userData.transactions || []); 
  //     }  
  //   } catch (error) {  
  //     console.error("Error fetching user data:", error);  
  //   } 
  // }

  // useEffect(() =>{
  //   const auth = getAuth();
  //   const database = getDatabase()
  //   const userId = auth.currentUser.uid;
  //   const transactionRef = ref(database, `users/${userId}/transactions`);

  //   onValue(transactionRef, (snaphot) =>{
  //     const transactions = [];
  //     snaphot.forEach(childSnapshot => {
  //       transactions.push({id: childSnapshot.key, ...childSnapshot.val()})
  //     });
  //     setTransaction(transactions)
  //   }, (error) => {
  //     console.error('Error fetching transaction history:', error)
  //   })
  // }, [userId])

  return(
    <div>
    {/* for side bar  */}
    <div className="navigate-bars"> 
      <DashBars username={username} email={email}/>     
      <div className="main">
        <div className="dashbord-ccontainer">
          <h2 className="welcome-heading">Transactions on your account
          </h2>
          <div className="account-container" id="transaction-container">
            {transactions && transactions.length  > 0 ? (
              <div className="trans-table">
                <div>
                  <div className="trans-table-head">
                    <h3>S/N</h3>
                    <h3>Amount</h3>
                    <h3>Payment</h3>
                    <h3>Status</h3>
                    <h3>Transation</h3>
                    <h3>Date</h3>
                  </div>
                </div>
                <div>
                  <div className="trans-table-row">
                    {transactions.slice().sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((transaction, index) => (
                      <div key={index} className="trans-table-body">
                        <h4>{index + 1}</h4>
                        <h4>{transaction.amount}</h4>
                        <h4>{transaction.paymentMethod}</h4>
                        <h4 className={transaction.status === 'Success' ? "success" : 'pending'}>{transaction.status}</h4>
                        <h4 className={transaction.transaction === 'withdraw' ? "withdraw-signs": "depo-signs"}>{transaction.transaction}</h4>
                        <h4>{new Date(transaction.date).toLocaleDateString()}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ): (
              <h1>No Transaction Available</h1>
            )}
            
            {/* <table>
              <tr className="table-header">
                <th></th>
                <th>S/N</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
              <tr className="table-body">
                <td>1</td>
                <td>$500</td>
                <td>Bitcoin</td>
                <td className="success">Success</td>
                <td>12:10:2024</td>
              </tr>
            </table> */}
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
export default TransactionPage;