import emailjs from "@emailjs/browser"

function sendEmail(e) {
  e.preventDefault()
  const serviceId = 'service_ul0gipd';
  const templateId = 'template_i1cgepc';
  const publicId = 'NMdgxVkNH4qWPTEUQ';

  emailjs.sendForm(
    serviceId,
    templateId,
    form.current,
    publicId
  ).then((result) => {
    console.log(result.text);
    alert('Message Successfuly Sent');
  }, (error) => {
    console.error(error.text);
  }) 
}
export default sendEmail;