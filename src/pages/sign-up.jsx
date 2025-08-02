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


  // handle events
  const {
    register, 
    handleSubmit, 
    watch, 
    getValues,
    formState: { errors },
  } = useForm();

  // countries effects 
  useEffect(() => {
    const data = CountryData;
    setCountries(data)
  }, [])

  // handle the submit 
  const onSubmit =  async () => {
    // console.log(data)
    // sendEmail();
    try{
      document.querySelector('#sign-up').innerHTML = 'Signing Up...'; 
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user already exists in the database
      const userRef = ref(database, 'users/' + user.uid);
      const snapshot = await get(userRef);

      if(!snapshot.exists()){
        // Only set user data if it doesn't exist 
        await set(userRef, {
          username: username,
          fullname: fullname,
          email: email,
          phone: phone,
          password: password,
          country: selectedCountry,
          referer: referer,
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
      document.querySelector('#sign-up').innerHTML = 'Sign Up'; 
        setErrorMessage(error.message)
      if(error.message = 'auth/email-already-in-use'){
        alert('The email address is already in use by another account');
      }else if(error.message = 'auth/user-disabled') {
        alert('The user corresponding to the given email has been disabled')
      }
    }
  }

  return(
    <React.Fragment>
      <div className="sign-container">
        <div className="logo-div">
        <img src="brand.png" className="logo"/>
        </div>

        {/* form contents containers  */}

        <div className="form-container">
          <h3>Create an Account</h3>

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
                  {...register("username", {required: true})}
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
                  {errors.username.type === 'required' ? 'Username is required' : 'Username must be at least 6 characters'}
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
                  {...register("fullname", {required: true, minLength: 10})}
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
                  {errors.fullname.type === 'required' ? 'Fullname is required' : 'Fullname must be at least 5 characters'}
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
                {errors.email.type === 'required' ? 'Email is required' : 'The email address is not valid.'}
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
                <input type="password" 
                  {...register("password", {required: true, minLength: 6})}
                  placeholder="Enter Password" 
                  onChange = {(e) => setPassword(e.target.value)}
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

            {/* confirm password input section  */}
            <div className="form-group">
              <label>Confirm Password <span className="text-danger">*</span> </label>
              <div className="input-group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="icon">
                  <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17l0 80c0 13.3 10.7 24 24 24l80 0c13.3 0 24-10.7 24-24l0-40 40 0c13.3 0 24-10.7 24-24l0-40 40 0c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"/>
                </svg>
                <input 
                  type="password"
                  {...register("confirmPassword", {required: true, validate: value => value === getValues().password})}
                  placeholder="Confirm Password" 
                  className={errors.confirmPassword ? 'input-error pl-3r' : 'pl-3r' }
                  onInput={(e) => {
                    if(e.target.value.length > 25){
                      e.target.value = e.target.value.substring(0, 25)
                    }
                  }}
                />
                {errors.confirmPassword && 
                (<div className="error-msg">
                  {errors.confirmPassword.type === 'required' ? 'Password is required' : 'Password do not match'}
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
            <button type="submit" id="sign-up">Sign Up</button>
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
        </div>
      </div>
    </React.Fragment>
  )
}
export default SignUpUser;