<template>
    <section class="contact" id="Contact">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 col-md-6">
              <h2 class="font-weight-bold text-center  mb-5 animate__animated animate__zoomIn">Contact Us</h2>
              <div class="card shadow-lg">
              <div class="card-body">
                <form action="https://formspree.io/f/xpzerlyo" method="post">
                  <div class="form-group">
                    <label for="firstName" class="text-black">First Name</label>
                    <input type="text" class="form-control" id="firstName" placeholder="Enter your first name" name="firstName" required>
                  </div>
                  <div class="form-group">
                    <label for="lastName" class="text-black">Last Name</label>
                    <input type="text" class="form-control" id="lastName" placeholder="Enter your last name" name="lastName" required>
                  </div>
                  <div class="form-group">
                    <label for="email" class="text-black">Email address</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter your email" name="EmailAddress" required>
                  </div>
                  <div class="form-group">
                    <label for="message" class="text-black">Your Message</label>
                    <textarea class="form-control" id="message" rows="5" placeholder="Enter your message" name="Message"></textarea>
                  </div>
                  <button type="submit" class="btn btn-primary mt-3">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {}
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Fjalla+One&family=Inconsolata&display=swap');
  
  #Contact {
    background: radial-gradient(circle, rgba(248, 248, 248, 1) 0%, rgb(193, 210, 232) 100%);
    font-family: 'Black Mango Medium';
    font-size: 17px;
    color: rgb(27, 61, 102);
    letter-spacing: 0.1rem;
    word-spacing: 0.2rem;
    line-height: 40px;
  }
  
  h2{
    margin-bottom: 30px;
    font-size: 4rem;
    color: rgb(27, 61, 102);
  }
  .contact {
    background-color: #f8f9fa;
    padding: 50px 0;
  }
  
  .card {
    border-radius: 15px;
    border: none;
    transition: all 0.3s;
  
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  }
  
  .card1 {
  background-color: rgb(27, 61, 102);
  border-radius: 15px;
  border: none;
  transition: all 0.3s;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  }
  
  .card-bodyContact {
  padding: 50px;
  }
  
  h1 {
  font-size: 48px;
  color: #ffffff;
  font-weight: 500;
  margin-bottom: 30px;
  font-weight: bold;
  }
  
  h5 {
  font-size: 24px;
  color: #ffffff;
  font-weight: 300;
  margin-bottom: 15px;
  font-weight: bold;
  }
  
  label {
  font-size: 20px;
  color: rgb(27, 61, 102);
  font-weight: 500;
  margin-bottom: 5px;
  font-weight: bold;
  }
  
  .form-control {
  border-radius: 5px;
  border: none;
  background-color: rgba(193, 210, 232, 0.477);
  padding: 10px 20px;
  color: rgb(27, 61, 102);
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 30px;
  }
  
  .form-control:focus {
  box-shadow: none;
  border-color: rgb(27, 61, 102);
  }
  
  textarea.form-control {
  height: 150px;
  resize: none;
  }
  
  .btn {
  background-color:rgb(27, 61, 102);
  border: none;
  cursor: pointer;
  padding: 15px 30px;
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
  border-radius: 5px;
  transition: all 0.3s;
  }
  
  .btn:hover {
  background-color: #ffffff;
  color: rgb(27, 61, 102);
  }
  
  .rounded-circle {
  border-radius: 50%;
  }
  
  @media (max-width: 768px) {
  h1 {
  font-size: 36px;
  }
  .card-bodyContact {
  padding: 30px;
  }
  h5 {
  font-size: 18px;
  }
  label {
  font-size: 18px;
  }
  .form-control {
  font-size: 16px;
  }
  .btn {
  font-size: 16px;
  padding: 12px 24px;
  }
  }
  </style>