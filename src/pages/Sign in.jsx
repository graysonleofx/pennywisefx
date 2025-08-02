import React from "react";
import { useState } from "react";
import {useForm} from "react-hook-form"
import { Link } from "react-router-dom";
import { ref, get, update } from 'firebase/database';  
import {auth, database} from '../firebase'
import {signInWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import '../styles/sign-up.css'

function SignInUser({ onLogin}){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // sign up Error message authetication 
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();
  // handle events
  const {register, handleSubmit,
  formState: { errors },
  } = useForm();


  // handle the submit 
  const onSubmit =  async () => {
    // console.log(data)
    try{
      document.querySelector('#sign-in').innerHTML = 'Signing In...'; 
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Fetch user data from Realtime Database  
      const userRef = ref(database, 'users/' + user.uid);  
      const snapshot = await get(userRef);  

      if (snapshot.exists()) {  
      const userData = snapshot.val();  
      onLogin(
        userData.username, 
        userData.totalProfit, 
        userData.totalDeposit,
        userData.totalBouns, 
        userData.totalInvestment, 
        userData.totalWithdrawal,
      ); 

      if(userData.firstLogin){
        // Show notification  
        alert('Congratulations! You have a profit bonus coming in less than 24 hours.');

        // Update firstLogin flag to false  
        await update(userRef, {firstLogin:false});
      }
    } else {  
      console.log('No user data available');  
    } 
    navigate('/dashboard');

    }catch(error){
      console.log(error)
      document.querySelector('#sign-in').innerHTML = 'Sign In'; 
      setErrorMessage(error.message)
       if (error.message = 'auth/wrong-password'){
        alert('Wrong Password');
      }else if (error.message = 'auth/too-many-requests'){
        alert('Too many requests. Please try again later.');
      }else if (error.message = 'auth/network-request-failed'){
        alert('No Internet Service');
      }

    }
  }

  <sendEmail/>
  
  return(
    <React.Fragment>
      <div className="sign-container">
        <div className="logo-div">
        <img src="brand.png" className="logo"/>
          {/* <h1 className="logo">
            PennyWise <span >FX</span>
          </h1> */}
        </div>

        {/* form contents containers  */}

        <div className="form-container">
          <h3>Welcome back</h3>

          {/* form div */}
          <form onSubmit={handleSubmit(onSubmit)}>
            
            {/* Email input Section  */}
            <div className="form-group">
              <label>Your Email <span className="text-danger">*</span> </label>
              <div className="input-group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="icon">
                  <path d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z"/>
                </svg>
                <input 
                  type="email" 
                  name="email"
                  {...register("email", {required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/})}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"  
                  className={errors.email ? 'input-error pl-3r' : 'pl-3r' }
                  // name="user_email"
                />
              </div>
              {errors.email && 
              (<div className="error-msg">
                {errors.email.type === 'required' ? 'Email is required' : 'Invaild email format'}
              </div>)}
            </div>

            {/* Password input section  */}
            <div className="form-group">
              <label>Password <span className="text-danger">*</span> </label>
              <div className="input-group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="icon">
                  <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17l0 80c0 13.3 10.7 24 24 24l80 0c13.3 0 24-10.7 24-24l0-40 40 0c13.3 0 24-10.7 24-24l0-40 40 0c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"/>
                </svg>
                <input type="password" 
                  {...register("password", {required: true, minLength:6})}
                  placeholder="Enter Password" 
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? 'pl-3r input-error' : 'pl-3r' }
                  onInput={(e) => {
                    if(e.target.value.length > 25){
                      e.target.value = e.target.value.substring(0, 25)
                    }
                  }}
                />
                {errors.password && 
                (<div className="error-msg">
                  {errors.password.type === 'required' ? 'Password is required' : 'The password is too weak. It should be at least 6 characters.'}
                </div>)}
              </div>
            </div>
            {/* Sign in footer section  */}
            {/* <div className="sign-in-footer">
              <div className="remember-me">
                <input type="checkbox"/>
                <label>Remember me</label>
              </div>

              <label>
                <a href="">Forgotten password?</a>
              </label>
            </div> */}
              <button type="submit"  id="sign-in">Sign in</button>
          </form>

          <div className="already-have-act-div">
            <p>Don't have an account? 
              <span>
                <Link to='/sign-up'>Sign Up</Link>
                {/* <a href="sign-up">Sign Up</a> */}
              </span>
            </p>
          </div>

          {/* <div className="copyright-div">
            <p>© Copyright 2024   Pennywise Trading FX   All Rights Reserved.</p>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  )
}
export default SignInUser;