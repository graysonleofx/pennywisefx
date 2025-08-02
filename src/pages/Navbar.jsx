import React, {useState, useEffect}from 'react';
import {NavLink, Link, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import '../styles/navbar.css';

function NavigationBar ({homeRef, aboutRef, planRef, contactRef}) {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home'); // Stat`qqq
  // e to track active section  

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {  
      entries.forEach(entry => {  
          if (entry.isIntersecting) {  
              setActiveSection(entry.target.id); 
          }  
      });  
    }); 

    // Observe the sections  
    const sections = [homeRef.current, aboutRef.current, planRef.current, contactRef.current];

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
  }, [aboutRef, homeRef, planRef, contactRef])


  const handleClick = () =>{
    setToggle(!toggle)
  }
  const handleSignUp = () => {
    navigate('/sign-up');
  } 
  const handleSignIn = () => {
    navigate('/sign-in');
  }
  const scrollToSection = (ref) => {  
    if (ref && ref.current) {  
      window.scrollTo({  
        top: ref.current.offsetTop,  
        behavior: 'smooth',  
      });  
    }  
  }; 
  return(
    <header>
      <div className='logo-container'>
        <img src="brand.png" className="logo"/>
        {/* <strong className='logo'>
            PennyWise
          <span>FX</span></strong> */}
      </div>
      
      <nav className='navigation-bar'>
        <ul>
          <li>
            <NavLink to="/" className='Link' onClick={() => scrollToSection(homeRef)}
            style={{ color: activeSection === 'home' ? 'yellowgreen' : 'white' }}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink  className='Link' onClick={() => scrollToSection(aboutRef)}  style={{ color: activeSection === 'about' ? 'yellowgreen' : 'white' }}>
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to='/' className='Link' onClick={() => scrollToSection(planRef)}
            style={{color: activeSection === 'plan' ? 'yellowgreen' : 'white' }}>
              Plan
            </NavLink>
          </li>
          <li>
            <NavLink to='/contact-us' className='Link'
            onClick={() => scrollToSection(contactRef)}
            style={{color: activeSection === 'contact' ? 'yellowgreen' : 'white' }}>
              Contact Us
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className='button-container'>
        <Link to='/sign-in'>
          <button style={{display: 'flex', alignItems: 'center', columnGap: '10px'}}> 
            Sign In
            
            <FontAwesomeIcon icon={ faArrowRightToBracket} />
          </button>
        </Link>

        {/* <button onClick={handleSignUp}>Sign up</button> */}
      </div>

      <div className="toggle-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25px" onClick={handleClick}>
          <path fill="#f6f7f9" d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L96 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/>
        </svg>

        {toggle ? 
        
          <div className="dropdown-menu open resp-nav">
            <li>
              <NavLink to="/" className='Link' onClick={() => scrollToSection(homeRef)}
              style={{ color: activeSection === 'home' ? 'yellowgreen' : 'white' }}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink  className='Link' onClick={() => scrollToSection(aboutRef)}  style={{ color: activeSection === 'about' ? 'yellowgreen' : 'white' }}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to='/' className='Link' onClick={() => scrollToSection(planRef)}
              style={{color: activeSection === 'plan' ? 'yellowgreen' : 'white' }}>
                Plan
              </NavLink>
            </li>
            <li>
              <NavLink to='/contact-us' className='Link'
              onClick={() => scrollToSection(contactRef)}
              style={{color: activeSection === 'contact' ? 'yellowgreen' : 'white' }}>
                Contact Us
              </NavLink>
            </li>
            <li className='rsp-button'>                <button onClick={handleSignIn}> Sign In </button>
              <button onClick={handleSignUp}>Sign Up</button>
            </li>
          </div>
        : <></>}
      </div>

    </header>
  )
}
export default NavigationBar;