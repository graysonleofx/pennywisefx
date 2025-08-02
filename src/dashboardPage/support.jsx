import React from "react";
import { useRef} from "react";
import emailjs from "@emailjs/browser"
import DashBars from "./dash-bar";
import '../styles/dashboard.css'

// const messageRef = useRef(message);
function SupportPage ({username, email}) {
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault()
    const serviceId = 'service_ul0gipd';
    const templateId = 'template_i1cgepc';
    const publicId = 'NMdgxVkNH4qWPTEUQ';

    emailjs.sendForm(
      serviceId,
      templateId,
      form.current,
      publicId,
    ).then((result) => {
      console.log(result.text);
      alert('Message Successfuly Sent');
    }, (error) => {
      console.error(error.text);
    }) 

    // try{
    //   setLoading(true);
    //   await emailjs.send(serviceId, templateId, {
    //     message: message,
    //   });
    //   alert('email successfully sent');
    // } catch(error){
    //   console.log(`'error${error}`)
    // } finally {
    //   setLoading(false)
    // }
  }

  return(
    <div>
    {/* for side bar  */}
    <div className="navigate-bars"> 
      <DashBars username={username} email={email}/>     
      <div className="main">
        <div className="dashbord-ccontainer">
          <div className="support-div">
          <h2 className="support-heading">
            Pennywise Trading FX Support
          </h2> 
          <p>For inquiries, suggestions or complains. Mail us</p>
          <span>Pennywiseasset@gmail.com</span>

          <form className="support-form" ref={form} onSubmit={handleSubmit}>
            <label>Message <span>*</span></label>
            <textarea
              rows='8' 
              placeholder="Type your message"
              name='message'></textarea>
            <button type="submit">Send</button>
          </form>
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
export default SupportPage;