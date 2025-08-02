import React, {useState, useEffect} from "react";
import {NavLink} from 'react-router-dom';
import '../styles/page.css'

export default function FooterSection({homeRef, aboutRef, contactRef}){
  // const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {  
      entries.forEach(entry => {  
          if (entry.isIntersecting) {  
              setActiveSection(entry.target.id); 
          }  
      });  
    }); 

    // Observe the sections  
    const sections = [homeRef.current, aboutRef.current, contactRef.current];

    sections.forEach(ref => {  
      if (ref) {  
          observer.observe(ref);  
      }  
    });  

    return () => {
      sections.forEach(ref => {  
        if (ref) {  
            observer.unobserve(ref);  
        }  
    });  
};
  }, [aboutRef, homeRef, contactRef]);

  const scrollToSection = (ref) => {  
    if (ref && ref.current) {  
      window.scrollTo({  
        top: ref.current.offsetTop,  
        behavior: 'smooth',  
      });  
    }  
  };

  return(
    <>
      <section className="footer-section footer">
        <div className="newslatter-div">
          <div className="sub-newslatter-div">
            <h2>Subscribe to Newsletter</h2>
            <p>Regular Updates From Pennywise Trading FX Via Email.</p>
          </div>

          <div className="newslatter-input-div">
            <input type="text" placeholder="Email" />
            <button className="resp-sub-btn">Subscribe</button>
          </div>
        </div>

        <div className="footer-div footer_Dive">
          <div className="footer-logo">
          <img src="brand.png" className="foot-logo"/>
            <p>
              Founded and managed by leading industry professionals Pennywise Trading FX was established with a clear vision: To provide unrivaled trading solutions to investors from all over the world with a stellar client centered culture.
            </p>
          </div>

          <div className="footer-nav">
            <h3>Navigation</h3>
              <p>
                <NavLink onClick={() =>  scrollToSection(homeRef)} style={{ color: activeSection === 'home' ? 'yellowgreen' : '#C2C2C2' }}>
                  Home
                </NavLink>
                {/* <a href="#">Home</a> */}
              </p>

              <p>
                <NavLink onClick={() => scrollToSection(aboutRef)}  style={{ color: activeSection === 'about' ? 'yellowgreen' : '#C2C2C2' }}>
                  About Us
                </NavLink>
                {/* <a href="#">About Us</a> */}
              </p>

              <p>
                <NavLink to='/contact-us' 
                  onClick={() => scrollToSection(contactRef)}
                 style={{color: activeSection === 'contact' ? 'yellowgreen' : '#C2C2C2' }}>
                  Contact Us
                </NavLink>
                {/* <a href="#">Contact Us</a> */}
              </p>
          </div>

          <div className="footer-legal-div">
            <h3>Legal</h3>
            <p> <a href="">Privacy Policy</a></p>
            <p> <a href="">Terms of Service</a></p>
          </div>

          <div className="footer-contaact-div">
            <h3>Contact</h3>
            <div className="footer-contact-info">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20px">
                <path fill="#0e5d45" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
              </svg>
              <p>Pennywiseassets@gmail.com
              </p>
            </div>
          </div>
        </div>

        <p className="copyright">Copyright © 2025 All rights reserved</p>
      </section>
    </>
  )
}