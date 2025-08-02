import React from 'react';
import { useRef } from 'react';
import ParticlesComponent from '../component/Particles';
import NavigationBar from './Navbar';
import InvestmentCalculator from './investmentCalculator';
import CryptoTicker from './coinPrieTicker';
import FooterSection from './footer';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faLock, faMoneyBillWave, faExchangeAlt, 
  faShieldAlt, faExclamationTriangle, faTrophy, 
  faCog, faUserPlus, faDollarSign, faAppleAlt,
  faWindowMaximize, faMobileAlt
} from '@fortawesome/free-solid-svg-icons';  
import '../styles/page.css';

function LandingPage() {
  const navigate = useNavigate();
  const aboutRef = useRef(null);
  const homeRef = useRef(null);
  const planRef = useRef(null);
  const contactRef = useRef(null);

  const handleSignUp = () => {
    navigate('/sign-up');
  }  
  return(
    <>
      <NavigationBar aboutRef={aboutRef} homeRef={homeRef} planRef={planRef} contactRef={contactRef}/>
      <main>
        <section ref={homeRef} id='home'>
          <div className="container">
          <ParticlesComponent/>
            <div className="overLay" >
              <div className='contents'>
                <h1>
                  Join The Global Leader Of Financial Investments
                </h1>

                <p>
                  Pennywise Trading FX is a group of financial and cryptocurrency experts that invest in mining and cryptocurrency trading. We carefully examine the volatility of bitcoin and other crypto currencies, invest and make good profit from our investments.
                </p>
              </div>
              <button onClick={handleSignUp}>Get Started
              </button>
            </div>
          {/* <ParticlesBg/> */}
          </div>
        </section>

        <section className='abt-section' ref={aboutRef} id='about'>
          <div className="about-container">
            <div className='abt-img'>
              <img src="r.png" alt=""  />
            </div>
            <div className='abt-content'>
              <h2>Who we are</h2>
              <p>
                Pennywise Trading FX is a successful online trading and investment platform for brokers interested in Foreign Exchange, Stock Market Trading, and Cryptocurrency Trading. We give our users the potential to generate financial returns on both rising and falling prices across indices, FX, commodities, shares and cryptocurrencies. 
              </p>
              {/* <button ref={homeRef} id='home'>About Us</button> */}
            </div>
          </div>
        </section>

        <section className='save-time-section'>
          <div className='save-time-container'>
            <div className='save-time-contents'>
              <h2>Save time. Get Higher <br /> Return. Multiply wealth.</h2>
              <p>
                Investing can be intimidating, especially for beginners. Sometimes managing an investment is daunting due to the uncertainty and volatility of the market, as well as the time investment needed to be successful.
              </p>

              <div className='three-div'>
                <div className="secure-div">
                  <FontAwesomeIcon icon={faLock} size='2x' color='white' className='iconStyle'/>
                  <p>Secure <br /> Service</p>
                </div>
                <div  className="multi-currency-div">
                  <FontAwesomeIcon icon={faMoneyBillWave} size='2x' color='white' className='iconStyle'/>
                  <p>
                    Multi <br /> 
                    Currency <br />
                    Support
                  </p>
                </div>
                <div className="currency-exchange-div">
                  <FontAwesomeIcon icon={faExchangeAlt} size='2x' color='white' className='iconStyle'/> 
                  <p>Currency <br /> Exchange</p>
                </div>
              </div>
            </div>

            <div className='save-time-img-div'>
              <img src="btc-removebg.png" alt=""/>
            </div>
          </div>
        </section>

        <section className='why-chooseUs-section'>
          <h2 className='choose-us-h2'>Why Choose Us?</h2>
          <p className='choose-us-p'>
            We are committed to helping our users attain their goals, simplifying the complexities of investing with instinctual tools that make you efficient for decision making.
          </p>

          <div className='why-chooseUs-content'>
            <div className='bank-grade-div'>
              <div className='icon-div'>
                <FontAwesomeIcon icon={faShieldAlt} size='2x'/>  
              </div>
              
              <div className='bank-grade-content'>
                <h3>Bank Grade Security</h3>
                <p>
                  Pennywise Trading FX team has extensive industry experience in system security within financial services and in-depth knowledge in blockchain. Pennywise Trading FX multi-layered state-of-the-art security measures to ensure the safety and security of its system.
                </p>
              </div>
            </div>
            
            <div className='risk-mng-div'>
              <div className='risk-icon-div'>
                <FontAwesomeIcon icon={faExclamationTriangle} size='2x'/>
              </div>
              
              <div className='risk-mng-content'>
                <h3>Risk Management</h3>
                <p>
                  Trading on any market involves many opportunities with the capacity to make large profits quickly, but traders soon realise that a single loss can wipe out the portfolio. We execute a well-designed risk management strategy that lets you remain profitable overtime.
                </p>
              </div>
            </div>
            
            <div className='award-div'>
              <div className='award-icon-div'>
                <FontAwesomeIcon icon={faTrophy} size='2x'/>
              </div>
              
              <div className='award-content'>
                <h3>An Award-Winning Platform</h3>
                <p>
                  We use the latest industry-standard tools and technologies to bring the world of online trading and investment to your fingertips. 
                </p>
              </div>
            </div>
            
            <div className='automatic-div'>
              <div className='automatic-icon-div'>
              <FontAwesomeIcon icon={faCog} size='2x'/>
              </div>
              
              <div className='automatic-content'>
                <h3>Automatic Software</h3>
                <p>
                  We provide a highly-skilled and dedicated guide, featuring around-the-clock live support and delivering world-class solutions to clients. 
                </p>
              </div>
            </div>

          </div>

            <div className='tech-img-div'>
              <img src="technology.jpg" alt="" />
            </div>

            <div className='sample-step-div'>
              <h3>Get started in 3 simple steps​</h3>

              <div className='steps-contents-div'>

                <div className='step1-contents-div'>
                  <div className='step1-img-div'>
                    <FontAwesomeIcon icon={faUserPlus} size='2x'/>
                    <p className='step1-p'>Step 1</p>
                  </div>
                  <p className='first-step'>Create a free account</p>
                </div>

                <span><img src="arrow.svg"/></span>

                <div className='step2-contents-div'>
                  <div className='step2-img-div'>
                  <FontAwesomeIcon icon={faDollarSign} size='2x'/>
                    <p className='step2-p'>Step 2</p>
                  </div>
                  <p className='second-step'>Fund your account</p>
                </div>

                <span><img src="arrow.svg" /></span>

                <div className='step3-contents-div'>
                  <div className='step3-img-div'>
                    <FontAwesomeIcon icon={faMoneyBillWave} size='2x'/>
                    <p className='step3-p'>Step 3</p>
                  </div>
                  <p className='third-step'>Withdraw your profits</p>
                </div>
              </div>

              <button onClick={handleSignUp}>Get Started</button>
            </div>
        </section>

        <section className='platform-section'>
          <div className='platform-content-div'>

            <div className='pltform-content'>
              <span>AVAILABLE ON MULTIPLE PLATFORM</span>
              <h2 className='platform-h2'>World-class investment platform without a doubt.</h2>

              <div className='platforms-div'>
                <div className='mac-div'>
                  <FontAwesomeIcon icon={faAppleAlt} size='2x'/>
                  <p>MacOS</p>
                </div>

                <div className='windows-div'>
                  <FontAwesomeIcon icon={faWindowMaximize} size='2x'/>
                  <p>Windows</p>
                </div>

                <div className='android-div'>
                <FontAwesomeIcon icon={faMobileAlt} size='2x'/>  
                <p>Android</p>
                </div>
              </div>
            </div>

            <div className='pltform-img-div'>
              <img src="Clay_Mockup.png" className='plt-frm-img'/>
            </div>
          </div>

        </section>
          <div className='coin-ticker-div'>
           <CryptoTicker />
          </div>
        

        <section className='investment-plan-section' ref={planRef} id="plan">
          <h2>Investment Plans</h2>
          <p className='invest-plan-p'>
            Pennywise Trading FX has continued to provide groundbreaking investment solutions for over a decade.
          </p>

          <div className='investment-plans'>
            <div className='basic-plan'>
              <p>Basic Plan</p>
              <h3>$200 - $999</h3>
              <button onClick={handleSignUp}>Get Started</button>
              <ul>
                <li>Daily Profit:  5%</li>
                <li>Minimum Possible Deposit:  $200</li>
                <li>Maximum Possible Deposit:  $999</li>
                <li>Duration:   1 Month</li>
              </ul>
            </div>

            <div className='silver-plan'>
              <p>Silver Plan</p>
              <h3>$1,000 - $4,999</h3>
              <button onClick={handleSignUp}>Get Started</button>
              <ul>
                <li>Weekly Profit:  7%</li>
                <li>Minimum Possible Deposit:  $1,000</li>
                <li>Maximum Possible Deposit:  $4,999</li>
                <li>Duration:   1 Month</li>
              </ul>
            </div>

            <div className='gold-plan'>
              <p>Gold Plan</p>
              <h3>$5,000 - $9,999</h3>
              <button onClick={handleSignUp}>Get Started</button>
              <ul>
                <li>Monthly Profit:  10%</li>
                <li>Minimum Possible Deposit:  $5,000</li>
                <li>Maximum Possible Deposit:  $9,999</li>
                <li>Duration:   1 Month</li>
              </ul>
            </div>

          </div>

          <div className='investment-calculator-div'>
            <InvestmentCalculator />
          </div>
        </section>

        <section className='trusted-section trusted-section2'>
          <h2 className='trs-us-h2'>Reasons you should Trust Us</h2>

          <div className='trusted-div'>
            <div className='coin-clarity'>
              <div>
                <img src="icons/2.png" alt="" />
              </div>

              <div className='rate-div'>
                <h3>7.9</h3>
              </div>
            </div>

            <div className='token-market'>
              <div className='token-market-img-div'>
                <img src="icons/6.png" alt="" />
              </div>

              <div className='rate-div'>
                <h3>8.7</h3>
              </div>
            </div>

            <div className='Ico'>
              <div className='ico-img-div'>
                <img src="icons/3.png" alt="" />
              </div>

              <div className='rate-div'>
                <h3>8.0</h3>
              </div>
            </div>

            <div className='coin-market'>
              <div className='coin-market-img-div'>
                <img src="icons/4.png" alt="" />
              </div>

              <div className='rate-div'>
                <h3>9.0</h3>
              </div>
            </div>

            <div className='icorating'>
              <div className='ico-rating-img-div'>
                <img src="icons/1.png" alt="" />
              </div>

              <div className='rate-div'>
                <h3>8.9</h3>
              </div>
            </div>

            <div className='ico-alert'>
              <div className='ico-alert-img-div'>
                <img src="icons/5.png" alt="" />
              </div>

              <div className='rate-div'>
                <h3>8.9</h3>
              </div>
            </div>
          </div>

          <div className="card-div">
            <div className='card-1'>
              <div className='card-header'>
                <div className='card-img-div'>
                  <img src="white young.jpeg" alt="" width="90px"/>
                  <p>RUKKY SANDERS</p>
                  <div className='stars'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="16px">
                      <path fill="#cfa920" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="16px">
                      <path fill="#cfa920" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="16px">
                      <path fill="#cfa920" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="16px">
                      <path fill="#cfa920" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="16px">
                      <path fill="#cfa920" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                    </svg>
                  </div>
                </div>

                <span className='quote-icon-div'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="40px">
                    <path d="M448 296c0 66.3-53.7 120-120 120l-8 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l8 0c30.9 0 56-25.1 56-56l0-8-64 0c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l64 0c35.3 0 64 28.7 64 64l0 32 0 32 0 72zm-256 0c0 66.3-53.7 120-120 120l-8 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l8 0c30.9 0 56-25.1 56-56l0-8-64 0c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l64 0c35.3 0 64 28.7 64 64l0 32 0 32 0 72z"/>
                  </svg>
                </span>
              </div>

              <div className='card-body'>
                <p>
                  I have only been a member for a few months and i have already earned a decent amount of money spotify plays. Finally a real and honest company that does what it says. Thank you so much for this great opportunity!
                </p>
              </div>
            </div>

            <div className='card-2'>
              <div className='card-header'>
                <div className='card-img-div'>
                  <img src="black man.png" alt="" width="90px"/>
                  <p>SMITH JOHNSON</p>
                  <div className='stars'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="16px">
                      <path fill="#cfa920" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="16px">
                      <path fill="#cfa920" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="16px">
                      <path fill="#cfa920" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="16px">
                      <path fill="#cfa920" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="16px">
                      <path fill="#cfa920" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                    </svg>
                  </div>
                </div>

                <span className='quote-icon-div'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="40px">
                    <path d="M448 296c0 66.3-53.7 120-120 120l-8 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l8 0c30.9 0 56-25.1 56-56l0-8-64 0c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l64 0c35.3 0 64 28.7 64 64l0 32 0 32 0 72zm-256 0c0 66.3-53.7 120-120 120l-8 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l8 0c30.9 0 56-25.1 56-56l0-8-64 0c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l64 0c35.3 0 64 28.7 64 64l0 32 0 32 0 72z"/>
                  </svg>
                </span>
              </div>

              <div className='card-body'>
                <p>
                  Pennywise Trading FX runs a quick and reliable system. It feels great to know that I Can always trust their support system to come through for me CoinJoin. Their response speed is prompt and the delivery precise to the last detail.
                </p>
              </div>
            </div>

            <div className='card-3'>
              <div className='card-header'>
                <div className='card-img-div'>
                  <img src="white old.png" alt="" width="90px"/>
                  <p>ALEX GLYSON</p>
                  <div className='stars'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="16px">
                      <path fill="#cfa920" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="16px">
                      <path fill="#cfa920" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="16px">
                      <path fill="#cfa920" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="16px">
                      <path fill="#cfa920" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="16px">
                      <path fill="#cfa920" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                    </svg>
                  </div>
                </div>

                <span className='quote-icon-div'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="40px">
                    <path d="M448 296c0 66.3-53.7 120-120 120l-8 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l8 0c30.9 0 56-25.1 56-56l0-8-64 0c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l64 0c35.3 0 64 28.7 64 64l0 32 0 32 0 72zm-256 0c0 66.3-53.7 120-120 120l-8 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l8 0c30.9 0 56-25.1 56-56l0-8-64 0c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l64 0c35.3 0 64 28.7 64 64l0 32 0 32 0 72z"/>
                  </svg>
                </span>
              </div>

              <div className='card-body'>
                <p>
                  Am an engineer in Washington DC when an account manager KLOE AURORA brought this opportunity to me I just said casually to invest with $500 but my story today is on a premium plan.
                </p>
              </div>
            </div>

          </div>

          <div className='coins-div'>
            <img src="icons/bitcoin.png" />
            <img src="icons/bnb.png" />
            <img src="icons/eth.png"/>
            <img src="icons/litecoin.png"/>
          </div>
        </section>

      </main>
      <FooterSection aboutRef={aboutRef} homeRef={homeRef} contactRef={contactRef}/>

    </>
  )
}

export default LandingPage;