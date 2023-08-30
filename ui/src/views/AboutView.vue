<template>
  <body>
    <div class="container">
      <h1 class="text-center animate__animated animate__zoomIn">About Us</h1>
      <div class="row pt-5">
        <div class="col-md-6">
          <img
            src="https://i.postimg.cc/J0ShgqJN/ideogram2.jpg"
            alt="coding"
            class="w-100"
          />
        </div>
        <div class="col-md-6">
          <h2>Our Mission</h2>
          <p>
            We are passionate about inspiring young and adventurous minds in
            Africa to explore the world of coding. Our mission is to connect
            these bright young individuals with the exciting opportunity of
            coding bootcamps in South Africa. As a company, we may be new, but
            our vision is grand - we're dedicated to expanding our offerings of
            coding programs and destinations, so stay tuned for the latest
            updates!
          </p>
        </div>

        <div class="row py-5">
          <div class="col-md-6">
            <h2>Our Services</h2>
            <ul>
              <li>
                <b>-</b> Exciting coding bootcamp programs tailored for young
                explorers
              </li>
              <li><b>-</b> Comprehensive in-country support and guidance</li>
              <li>
                <b>-</b> User-friendly flight booking system with exclusive
                discounts
              </li>
              <li>
                <b>-</b> Expert advice and unwavering support for both young
                coders and their parents
              </li>
              <li>
                <b>-</b> Opportunities for language learning and skill
                development in a fun and educational environment
              </li>
            </ul>
          </div>
        </div>

        <div class="col-md-6">
          <img
            src="https://i.postimg.cc/pTGrQxL1/coding-SA.jpg"
            alt="Coding in SA"
            class="w-100"
          />
        </div>
      </div>
    </div>

    <div class="row py-5">
      <div class="col-md-6">
        <img
          src="https://i.postimg.cc/Qtr3wdfy/poor.jpg"
          alt="African coding destination"
          class="w-100"
        />
      </div>
      <div class="col-md-6">
        <h2>Our Impact</h2>
        <p>
          Since our launch, we've witnessed the transformational power of
          education and skill development for young minds in Africa. Through our
          coding bootcamps and upskilling initiatives, we are not just shaping
          the future; we're creating it.
        </p>

        <p>
          By providing access to coding education and technology-driven
          opportunities, we are nurturing the next generation of innovators,
          problem-solvers, and leaders. These young minds are not only learning
          to code; they're learning to think critically, creatively, and
          globally.
        </p>

        <p>
          Our impact extends far beyond the classroom. As we empower kids in
          Africa with coding skills, we're opening doors to countless
          possibilities. These skills are not only about building websites and
          apps; they're about building brighter futures and breaking down
          barriers.
        </p>

        <p>
          Through our booking application, we're not just facilitating travel;
          we're catalyzing change. We envision a future where young and
          explorative minds from Africa become the architects of technological
          advancements, the champions of innovation, and the leaders of positive
          transformation in their communities and beyond.
        </p>

        <p>
          Together, we're not just making a difference; we're shaping a future
          where every child's potential is unlocked, and where the possibilities
          are as limitless as their dreams.
        </p>
      </div>
    </div>
  </body>
</template>

<script></script>

<style scoped>
/* General styling */
body {
  background: radial-gradient(
    circle,
    rgba(248, 248, 248, 1) 0%,
    rgb(193, 210, 232) 100%
  );
  font-family: "Black Mango Medium";
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

h2 {
  margin-bottom: 30px;
  font-size: 4rem;
  /* padding-top: 70px; */
  color: rgb(27, 61, 102);
}

.slide {
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
  .about,
  .services,
  .impact {
    border-radius: 0;
  }

  .about,
  .impact {
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
