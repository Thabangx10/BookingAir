<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h4>Contact</h4>
          <p>
            Thabang Kganana<br>
            Junior Software Engineer<br>
            Cape Town, Western Cape, South Africa
          </p>
        </div>
        <div class="col-md-6">
          <h4>Follow Us</h4>
          <div class="container-fluid d-flex justify-content-center">
            <a class="footer-link" target="_blank" href="https://github.com/Thabangx10/BookingAir"><i class="fa-brands fa-github"></i>GitHub</a>
            <a class="footer-link" target="_blank" href="https://www.linkedin.com/in/thabangkganana/"><i class="fa-brands fa-linkedin"></i>LinkedIn</a>
          </div>
        </div>
      </div>
      <hr>
      <p class="text-center">Copyright © 2023 BookingAir</p>
    </div>
  </footer>
</template>

<style>
.footer {
  background-color: rgb(27, 61, 102);
  color: white;
  padding: 50px 0;
  font-family: 'Black Mango Medium';
    font-size: 17px;
    letter-spacing: 0.1rem;
    word-spacing: 0.2rem;
    line-height: 40px;
}

.footer h4 {
  color: white;
}

.footer p {
  color: white;
}

.social-icons li {
  display: inline-block;
  margin-right: 10px;
}

.social-icons li a i {
  font-size: 20px;
  color: white;
}

.social-icons li a i:hover {
  color: white;
}

hr {
  border-top: 1px solid white;
  border-bottom: none;
}

.footer-link {
    color: rgb(255, 255, 255);
    padding: 1rem;
}



.footer a:hover {
    color: rgb(90, 135, 194);
}

i {
    margin: 0.3em;
}


/* Media Query */
@media screen  and (max-width:1080px) {
    .footer i {
    font-size: small;
}
.footer a {
    font-size: small;
    line-height: 36px;
}
}
</style>