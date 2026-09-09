import React from "react";
import{ useState, useEffect } from "react";
import CountryData from "../component/CountryData";
import { Link } from "react-router-dom";
import {ref, set, get } from 'firebase/database'
import { useForm } from "react-hook-form"
import { auth, database } from '../firebase'
import { createUserWithEmailAndPassword }from "firebase/auth";
import { useNavigate } from "react-router-dom";
import '../styles/sign-up.css'

function SignUpUser(){
  // Countries selection state
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [referer, setReferer] = useState('');
  // sign up Error message authetication 
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  // handle events
  const {
    register, 
    handleSubmit, 
    watch, 
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  // countries effects 
  useEffect(() => {
    const data = CountryData;
    setCountries(data)
  }, [])

  // handle the submit 
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMessage('');
    try{
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Check if user already exists in the database
      const userRef = ref(database, 'users/' + user.uid);
      const snapshot = await get(userRef);

      if(!snapshot.exists()){
        // Only set user data if it doesn't exist 
        await set(userRef, {
          username: data.username,
          fullname: data.fullname,
          email: data.email,
          phone: data.phone || '',
          country: data.country,
          referer: data.referer || '',
          totalDeposit: 0,
          totalProfit: 0,
          accountBalance: 0,
          totalBouns: 0,
          totalInvestment: 0,
          totalWithdrawal: 0,
          totalSiverPlan: 0,
          totalGoldPlan: 0,
          totalDiamondPlan: 0,
          firstLogin: true
        })
      }else{
        console.log('user data already exists')
      }
      setUsername('');
      setFullname('');
      setEmail('');
      setPhone('');
      setPassword('');
      setSelectedCountry('');
      setReferer('');
      // alert('Sign up Successful');
      navigate('/sign-in');
    }catch(error){
      const messages = {
        'auth/email-already-in-use': 'This email is already linked to an account.',
        'auth/user-disabled': 'This account has been disabled.',
        'auth/weak-password': 'Choose a stronger password with at least 6 characters.',
        'auth/network-request-failed': 'No internet connection. Check your network and try again.'
      };
      setErrorMessage(messages[error.code] || 'Unable to create your account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return(
    <React.Fragment>
      <main className="auth-page">
        <section className="auth-shell auth-shell-signup">
          <aside className="auth-visual">
            <div className="auth-brand"><img src="/brand.png" className="logo" alt="PennyWise FX" /></div>
            <div className="auth-visual-copy">
              <span className="eyebrow">YOUR NEXT MOVE</span>
              <h1>Build your<br /><em>momentum.</em></h1>
              <p>Join a focused community of investors making more informed decisions.</p>
            </div>
            <div className="auth-stat"><strong>01</strong><span>One account. More possibilities.</span></div>
          </aside>
          <section className="form-container">
            <div className="form-heading"><span className="eyebrow">GET STARTED</span><h2>Create your account</h2><p>Set up your profile in a few simple steps.</p></div>
            {errorMessage && <div className="form-alert" role="alert">{errorMessage}</div>}

          {/* form div */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* username input seciton  */}
            <div className="form-group">
              <label>Username <span className="text-danger">*</span> </label>
              <div className="input-group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"  className="icon">
                  <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"/>
                </svg>
                <input 
                  type="text" 
                  name="username"
                  {...register("username", {required: 'Username is required', minLength: { value: 3, message: 'Use at least 3 characters.' }})}
                  placeholder="Enter Unique Username"
                  onChange = {(e) => setUsername(e.target.value)}  
                  className={errors.username ? 'input-error pl-3r' : 'pl-3r' }
                  // onInput={(e) => {
                  //   if(e.target.value.length > 10){
                  //     e.target.value = e.target.value.substring(0, 10)
                  //   }
                  // }}
                />
                {errors.username && 
                (<div className="error-msg">
                  {errors.username.message}
                </div>)}
                
              </div>
            </div>

            {/* fullname input section  */}
            <div className="form-group">
              <label>FullName <span className="text-danger">*</span> </label>
              <div className="input-group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"  className="icon">
                  <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"/>
                </svg>
                <input 
                  type="text" 
                  name="fullname"
                  {...register("fullname", {required: 'Full name is required', minLength: { value: 3, message: 'Enter your full name.' }})}
                  placeholder="Enter Fullname" 
                  onChange={(e) => setFullname(e.target.value)} 
                  className={errors.fullname ? 'input-error pl-3r' : 'pl-3r' }
                  // onInput={(e) => {
                  //   if(e.target.value.length > 10){
                  //     e.target.value = e.target.value.substring(0, 10)
                  //   }
                  // }}
                />
                {errors.fullname && 
                (<div className="error-msg">
                  {errors.fullname.message}
                </div>)}
              </div>
            </div>
            
            {/* Email input Section  */}
            <div className="form-group">
              <label htmlFor='email'>Your Email <span className="text-danger">*</span> </label>
              <div className="input-group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="icon">
                  <path d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z"/>
                </svg>
                <input 
                  type="text" 
                  name="email"
                  {...register("email", {required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/})}
                  onChange = {(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"  
                  // name="user_email"
                  className={errors.email ? 'input-error pl-3r' : 'pl-3r' }
                />
              </div>
              {errors.email && 
              (<div className="error-msg">
                  {errors.email.type === 'required' ? 'Email is required' : 'Enter a valid email address.'}
              </div>)}
            </div>
            
            {/* Phone number input section  */}
            {/* <div className="form-group">
              <label>Phone Number <span className="text-danger">*</span> </label>
              <div className="input-group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="icon">
                  <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
                </svg>
                <input 
                  type="number" 
                  {...register("phoneNumber", {required: true, minLength:11, maxLength: 11})}
                  placeholder="Enter Phone Number" 
                  onChange={(e) => setPhone(e.target.value)} 
                  className={errors.phoneNumber ? 'input-error pl-3r' : 'pl-3r' }
                  onInput={(e) => {
                    if(e.target.value.length > 11){
                      e.target.value = e.target.value.substring(0, 11)
                    }
                  }}
                />
                {errors.phoneNumber && 
                (<div className="error-msg">
                  {errors.phoneNumber.type === 'required' ? 'Phone number is required' : 'Invalid Phone number'}
                </div>)}
              </div>
            </div> */}

            {/* Password input section  */}
            <div className="form-group">
              <label htmlFor='password'>Password <span className="text-danger">*</span> </label>
              <div className="input-group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="icon">
                  <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17l0 80c0 13.3 10.7 24 24 24l80 0c13.3 0 24-10.7 24-24l0-40 40 0c13.3 0 24-10.7 24-24l0-40 40 0c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"/>
                </svg>
                <input type={showPassword ? 'text' : 'password'}
                  {...register("password", {required: 'Password is required', minLength: { value: 6, message: 'Use at least 6 characters.' }})}
                  placeholder="Enter Password" 
                  onChange = {(e) => setPassword(e.target.value)}
                  className={errors.password ? 'pl-3r input-error' : 'pl-3r' }
                />
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button>
                {errors.password && 
                (<div className="error-msg">
                  {errors.password.message}
                </div>)}
              </div>
            </div>

            {/* confirm password input section  */}
            <div className="form-group">
              <label>Confirm Password <span className="text-danger">*</span> </label>
              <div className="input-group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="icon">
                  <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17l0 80c0 13.3 10.7 24 24 24l80 0c13.3 0 24-10.7 24-24l0-40 40 0c13.3 0 24-10.7 24-24l0-40 40 0c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"/>
                </svg>
                <input 
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register("confirmPassword", {required: 'Please confirm your password', validate: value => value === getValues().password || 'Passwords do not match'})}
                  placeholder="Confirm Password" 
                  className={errors.confirmPassword ? 'input-error pl-3r' : 'pl-3r' }
                />
                <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)} aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}>{showConfirmPassword ? 'Hide' : 'Show'}</button>
                {errors.confirmPassword && 
                (<div className="error-msg">
                  {errors.confirmPassword.message}
                </div>)}
              </div>
            </div>

            {/* Country input section  */}
            <div className="form-group">
              <label htmlFor="country">Country <span className="text-danger">*</span> </label>
              <div className="input-group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="icon">
                  <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
                </svg>
                {/* <SelectCountry/> */}
                <select 
                  {...register('country', {required: 'Country is required'})}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  value={selectedCountry}
                  // className="select-pl"
                  className={errors.country ? 'input-error select-pl' : 'select-pl' }
                  >
                    <option value="" disabled>--Select Country--</option>
                    {
                      countries.map((item) => {
                        return(
                          <option key={item.country} value={item.country}>
                            {item.country}
                          </option>
                        )
                      })
                    }
                </select>
                {errors.country && <div className="error-msg">{errors.country.message}</div>}
              </div>
            </div>

            {/* References input section  */}
            {/* <div className="form-group">
              <label>Referral ID <span className="text-danger">*</span> </label>
              <div className="input-group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"  className="icon">
                  <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"/>
                </svg>
                  <input 
                    type="text" 
                    placeholder="Optional Referral Id" 
                    onChange={(e) => setReferer(e.target.value)}
                    // className="pl-3r"
                    className={errors.country ? 'input-error pl-3r' : 'pl-3r' }
                  />
              </div>
            </div> */}
            {/* Term & Condiction section  */}
            {/* <div className="t-and-c">
              <input type="checkbox"/>
              <label>I Accept the Terms And Privacy Policy</label>
            </div> */}
            <button type="submit" id="sign-up" disabled={isSubmitting}>{isSubmitting ? 'Creating account...' : 'Create account'}</button>
          </form>

          <div className="already-have-act-div">
            <p>Already have an account? 
              <span>
                <Link to='/sign-in'>Sign In</Link>
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
export default SignUpUser;