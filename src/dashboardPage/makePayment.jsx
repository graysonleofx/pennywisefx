import React from "react";
import { useState, useEffect } from "react";
import DashBars from "./dash-bar";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faCopy  } from '@fortawesome/free-solid-svg-icons';
import { ref, set, getDatabase} from 'firebase/database';  
import { getAuth } from "firebase/auth";
// css imports
import '../styles/dashboard.css';

const walletAddresses = { 
  "Bitcoin": 'bc1qwhu62ucz9k6dzf8aayz2qerqg2tc38c32shjss',
  'USDT (Trc20)': 'TNw2JhzeSVk95aLyR9zhuJPApuDUTLpPjy',
  'USDT (Erc20)': 'vKSVKCjwdhRALtTBhowZx2GLnddEQd7tJTSWaM7wM7P',
  'USDT (Bep20)': 'vKSVKCjwdhRALtTBhowZx2GLnddEQd7tJTSWaM7wM7P',
  'ETH (Erc20)': '0x4c8e7bde8dc15c1337b6d3b7697df0b2369b01a5'
}
const paymentImages = {  
  'Bitcoin': '/icons/btc.png',  
  'USDT (Trc20)': '/icons/usdt.png',  
  'USDT (Erc20)': '/icons/usdt.png',  
  'USDT (Bep20)': '/icons/usdt.png',  
  'ETH (Erc20)': '/icons/ethrum.png'  
}; 

function MakePayment ({username, email }) {
  const location = useLocation();
  const { selectedPaymentMethod, depositAmount } = location.state || {}; 
  const [walletAddress, setWalletAddress] = useState('');   
  const [paymentImage, setPaymentImages] = useState('');  
  const [fileInput, setFileInput] = useState(null);
  const [message, setMessage] = useState(''); 
  const [fileValidation, setFileValidation] = useState('');
  const [errors, setErrors]  = useState({fileValidation: null})

  // Set the wallet address based on the selected payment method  
  useEffect(() => {  
    if (selectedPaymentMethod)  {  
      setWalletAddress(walletAddresses[selectedPaymentMethod]);
      setPaymentImages(paymentImages[selectedPaymentMethod]);    
    }  
  }, [selectedPaymentMethod]);  

  // Function to copy the input value to clipboard  
  const handleCopy = () => {  
    const inputField = document.querySelector('.wallet-input'); // Get the input element using its ID  
    inputField.select(); // Select the input text  
    document.execCommand('copy'); // Copy the selected text  
    alert('Wallet address copied to clipboard!'); // Optional: provide feedback to the user  
  }

  const handleFileChange = (e) => {  
    if (e.target.files.length > 0) {  
      setFileInput(e.target.files[0]); 
      setFileValidation(e.target.files[0]);  
    }  
  };

  const sanitizeFileName = (fileName) => {  
    return fileName.replace(/[.#$[\]]/g, '_').replace(/\s+/g, '_');  
  }; 

  const handlePayment = async() => { 
    const newErrors = {fileInput: null};
    let isValid = true;
    
    if (!fileInput) { 
      setMessage('Please select a file to upload')
      isValid = false; 
    }  else{
      const sanitizedFileName = sanitizeFileName(fileInput.name)
      const auth = getAuth()
      const userId = auth.currentUser.uid;
      const database = getDatabase()
      const fileRef = ref(database, `users/${userId}/${sanitizedFileName}`);
      try{
        await set(fileRef, {
          name: sanitizedFileName,
          file: fileInput,
          uploadedAt: new Date().toISOString()
        });
        setMessage('file uploaded successfully')
      }catch (error) {  
        console.error( error);  
        setMessage(error.message);  
      } 
    }

    if(!fileValidation){
      newErrors.fileValidation = 'Please Upload your payment proof.';
      isValid =false;
    }

    setErrors(newErrors);
    
    if(isValid){ 
      alert('Deposits in progress...Wait for confirmation')
    }
  }


  return(
    <div>
    {/* for side bar  */}
    <div className="navigate-bars"> 
      <DashBars username={username} email={email}/>     
      <div className="main">
        <div className="dashbord-ccontainer mk-pymt-container">
          <h2 className="welcome-heading mk-pm-h2">Make Payment</h2>

          <div className="make-payment-container">
            <h4>
              You are to make payment of ${depositAmount} using your selected payment method. Screenshot and upload the proof of payment
            </h4>
  

              <div className="selected-pm">
                {paymentImage && (  
                  <img src={paymentImage} alt={selectedPaymentMethod} width='25px'/>  
                )}  
                <p>{selectedPaymentMethod}</p>
              </div>

              <div className="wallet-address-and-proof">
                <h3>{selectedPaymentMethod}  wallet Address:</h3>

                <div className="wallet-address">
                  <input 
                    type="text" 
                    className="wallet-input"
                    value={walletAddresses[selectedPaymentMethod]}
                    readOnly={true}
                    required
                    />
                  <button onClick={handleCopy}>
                    <FontAwesomeIcon icon={faCopy } size="lg"/>
                    {/* <img src="/vite.svg" alt="" width='25px'/> */}
                  </button>
                </div>
                <p className="network-type">
                  <strong>Network Type: </strong> 
                  {selectedPaymentMethod}
                </p>

                <div className="proof-of-payment">
                  <p>Upload Payment proof after payment.
                  </p>
                  <input 
                    onChange={handleFileChange}
                    type="file" className="proof-input"
                    required
                  />
                  {errors.fileValidation && (  
                  <span style={{ color: 'red', fontSize: '14px', marginTop: '-15px'}}>{errors.fileValidation}</span>  // Display error for number input  
                )}
                </div>

                <button className="make-payment" onClick={handlePayment}>Make Payment</button>
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
export default MakePayment;