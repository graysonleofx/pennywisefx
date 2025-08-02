import React from "react"
import NavigationBar from "./Navbar"
import '../styles/about.css'
// import '../styles/page.css'

export default function AboutUs() {
  return (
    <>
      <NavigationBar/>
      <div className='About-us-container'>
        <h1>About Us</h1>
      </div>

      
      <section className='abt-section'>
          <div className="about-container">
            <div className='abt-img'>
              <img src="../public/r.png" alt=""  />
            </div>
            <div className='abt-content'>
              <h2>Who we are</h2>
              <p>
                Promoters Trading FX is a successful online trading and investment platform for brokers interested in Foreign Exchange, Stock Market Trading, and Cryptocurrency Trading. We give our users the potential to generate financial returns on both rising and falling prices across indices, FX, commodities, shares and cryptocurrencies. 
              </p>
              <button>About Us</button>
            </div>
          </div>
        </section>

    </>
  )
}