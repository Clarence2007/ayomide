
// Email Sender
const form = document.querySelector('form');
const fullName = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const subject = document.getElementById('subject');
const message = document.getElementById('message');

function sendEmail() {
  const bodyMessage = `Full Name: ${fullName.value} <br>
                       Email: ${email.value} <br>
                       Phone Number: ${phone.value} <br>
                       Message: ${message.value} <br>`;

  Email.send({
      Host: "smtp.elasticemail.com",
      Username: "omotaladeclarence@gmail.com",
      Password: "764AA123B03089EBE2C3AAA205B07C7E3B1D",  // Consider using an environment variable or backend for this!
      To: 'omotaladeclarence@gmail.com',
      From: "omotaladeclarence@gmail.com",
      Subject: subject.value,
      Body: bodyMessage
  }).then((message) => {
      if (message === "OK") {
          Swal.fire({
              title: "Success!!",
              text: "You have submitted your message. We will get back to you in less than 24 hours",
              icon: "success"
          });
      } else {
          Swal.fire({
              title: "Error",
              text: "There was an issue sending your message. Please try again later.",
              icon: "error"
          });
      }
  }).catch((error) => {
      Swal.fire({
          title: "Error",
          text: "There was an error with the email service. Please try again later.",
          icon: "error"
      });
  });
}

function checkInputs() {
  const items = document.querySelectorAll('.item');
  let formValid = true;

  items.forEach(item => {
      if (item.value === "") {
          item.classList.add('error');
          item.parentElement.classList.add('error');
          formValid = false;
      }
      item.addEventListener('keyup', () => {
          if (item.value !== '') {
              item.classList.remove('error');
              item.parentElement.classList.remove('error');
          } else {
              item.classList.add('error');
              item.parentElement.classList.add('error');
          }
      });
  });

  return formValid;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const isValid = checkInputs();
  
  if (isValid) {
      sendEmail();
      // Clear all input fields after sending the email
      form.reset();
  } else {
      Swal.fire({
          title: "Error!!",
          text: "Please fill in all fields before submitting.",
          icon: "error"
      });
  }
});