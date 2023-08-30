<template>
  <body>
    <div class="container">
      <h1 class="text-center animate__animated animate__zoomIn">About Us</h1>
      <div class="row pt-5">
        <div class="col-md-6">
          <img src="https://i.postimg.cc/t4LDW7Hh/team-volunteers-stacking-hands.jpg" alt="Volunteers in action" class="w-100">
        </div>
        <div class="col-md-6">
          <h2>Our Mission</h2>
          <p>We believe that volunteering is a powerful way to make a positive impact on the world, and we're committed to connecting people who want to volunteer with meaningful opportunities to do so. As a new company, we're starting small but dreaming big - we're constantly adding new volunteer programs and destinations to our roster, so stay tuned for updates!</p>
        </div>
  
        <div class="row py-5">
        <div class="col-md-6">
          <h2>Our Services</h2>
          <ul>
            <li><b>-</b> Wide range of volunteer programs</li>
            <li><b>-</b> In-country support and guidance </li>
            <li><b>-</b> Intuitive booking system for flights</li>
            <li><b>-</b> Expert advice and support for volunteers</li>
            <li><b>-</b> Opportunities for language learning and skill development</li>
          </ul>
        </div>
        <div class="col-md-6">
          <img src="https://i.postimg.cc/Yq4pb2PX/cheerful-call-center-operators-during-working-process.jpg" alt="Volunteers in action" class="w-100">
        </div>
          </div>
          </div>
  
  
          <div class="row py-5">
        <div class="col-md-6">
          <img src="https://i.postimg.cc/d3hjhT0P/women-support-group.jpg" alt="Volunteer destination" class="w-100">
        </div>
        <div class="col-md-6">
          <h2>Our Impact</h2>
          <p>Since our launch, we've helped thousands of volunteers make a positive impact on the world. Whether it's teaching English in a rural village or building sustainable infrastructure in an underserved community, we're proud to offer volunteer programs that make a real difference.</p>
        </div>
      </div>
    </div>
    </body>
  </template>
  
  <script>
 
  </script>
  
  
  
  <style scoped>
  /* General styling */
  body {
    background: radial-gradient(circle, rgba(248, 248, 248, 1) 0%, rgb(193, 210, 232) 100%);
    font-family: 'Black Mango Medium';
    font-size: 17px;
    color: rgb(27, 61, 102);
    font-weight: bold;
    letter-spacing: 0.1rem;
    word-spacing: 0.2rem;
    line-height: 40px;
  }
  
  .container {
    max-width: 1300px;
    margin: 0 auto;
  }
  
  /* Header */
  h1 {
    margin-bottom: 30px;
    font-size: 5rem;
    padding-top: 70px;
    color: rgb(27, 61, 102);
    text-align: center;
  }
  
  /* About section */
  .about {
    background-color: #6e91b3;
    border-radius: 25px;
    padding: 50px 20px;
    text-align: center;
  }
  
  p {
    margin: 0;
    margin-bottom: 20px;
  }
  
  /* Services section */
  .services {
    background-color: #ffffff;
    border-radius: 25px;
    padding: 50px 20px;
  }
  
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  li {
    margin-bottom: 20px;
  }
  
  /* Impact section */
  .impact {
    background-color: #6e91b3;
    border-radius: 25px;
    padding: 50px 20px;
    text-align: center;
  }
  
  /* Images */
  img {
    border-radius: 25px;
    margin-bottom: 20px;
  }
  
  
  
  
  /* ------------------------------------------Carousel-------------------------------------------------------------- */
  
  h2{
    margin-bottom: 30px;
    font-size: 4rem;
    /* padding-top: 70px; */
    color: rgb(27, 61, 102);
  }
  
  
  .slide{
    object-fit: contain;
  }

  
  /* Responsive layout */
  @media (max-width: 768px) {
    h1 {
      font-size: 3.5rem;
    }
  
    h2 {
      font-size: 2.5rem;
    }
  
    .slide {
      width: 550px;
    }
    .about, .services, .impact {
      border-radius: 0;
    }
    
    .about, .impact {
      padding: 30px 20px;
    }
    
    .services {
      padding: 50px 20px 30px;
    }
    
    img {
      width: 100%;
    }
    
    ul {
      text-align: center;
    }
    
    li {
      margin-bottom: 10px;
    }
  }
  
  </style>
  