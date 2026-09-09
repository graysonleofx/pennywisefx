import React, { useState } from "react";
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import { ref, get, update } from 'firebase/database';  
import {auth, database} from '../firebase'
import {signInWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import '../styles/sign-up.css'

function SignInUser({ onLogin}){
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });


  // handle the submit 
  const onSubmit = async ({ email, password }) => {
    setIsSubmitting(true);
    setErrorMessage('');
    try{
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
      const messages = {
        'auth/invalid-credential': 'The email or password is incorrect.',
        'auth/wrong-password': 'The email or password is incorrect.',
        'auth/too-many-requests': 'Too many attempts. Please try again later.',
        'auth/network-request-failed': 'No internet connection. Check your network and try again.'
      };
      setErrorMessage(messages[error.code] || 'Unable to sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return(
    <React.Fragment>
      <main className="auth-page">
        <section className="auth-shell">
          <aside className="auth-visual">
            <div className="auth-brand"><img src="/brand.png" className="logo" alt="PennyWise FX" /></div>
            <div className="auth-visual-copy">
              <span className="eyebrow">PENNYWISE FX</span>
              <h1>Trade with<br /><em>clarity.</em></h1>
              <p>A smarter way to grow, track and manage your financial future.</p>
            </div>
            <div className="auth-stat"><strong>24/7</strong><span>Secure account access</span></div>
          </aside>
          <section className="form-container">
            <div className="form-heading"><span className="eyebrow">WELCOME BACK</span><h2>Sign in to your account</h2><p>Enter your details to continue to your dashboard.</p></div>
            {errorMessage && <div className="form-alert" role="alert">{errorMessage}</div>}
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
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={errors.email ? 'input-error pl-3r' : 'pl-3r' }
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
                <input type={showPassword ? 'text' : 'password'}
                  {...register("password", {required: 'Password is required', minLength: { value: 6, message: 'Use at least 6 characters.' }})}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={errors.password ? 'pl-3r input-error' : 'pl-3r' }
                />
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button>
                {errors.password && 
                (<div className="error-msg">
                  {errors.password.message}
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
              <button type="submit" id="sign-in" disabled={isSubmitting}>{isSubmitting ? 'Signing in...' : 'Sign in'}</button>
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
        </section>
        </section>
      </main>
    </React.Fragment>
  )
}
export default SignInUser;