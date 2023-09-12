<template>
  <body>
    <!-- <div>
      <img
        srcset="https://i.postimg.cc/B68jg3qP/Experience-the-world-while-making-an-impact-on-lives-2.png"
        alt=""
        class="bg"
      />
    </div> -->
    <h1 class="title">Welcome</h1>
    <div class="welcome">
      <p class="description">
        Welcome to an exciting journey of learning and adventure, designed
        especially for young minds across Africa!
        <br />
        <br />
        Our mission is to empower kids in Africa with the skills of the future
        through our coding bootcamps in South Africa. We're thrilled to offer a
        unique opportunity for young explorers to delve into the world of coding
        and technology while experiencing the beauty of South Africa.
        <br />
        <br />
        At our bootcamps, your child will not only learn to code but also gain
        valuable problem-solving skills, creativity, and a deep understanding of
        technology. It's more than just education; it's a chance to unlock their
        potential and open doors to a world of opportunities.
        <br />
        <br />
        And that's not all – we're here to make this journey even more
        accessible. We're excited to provide exclusive flight discounts, making
        it easier for kids from all corners of Africa to reach our South African
        bootcamps. We believe that talent knows no boundaries, and we're
        committed to removing barriers to education.
        <br />
        <br />
        Rest assured, we'll take care of your child's accommodation and
        nutritional needs with the same level of professionalism and efficiency
        that you expect. We understand that a comfortable and safe environment
        is essential for a successful learning experience.
        <br />
        <br />
        Thank you for choosing us to be a part of your child's educational
        journey. We can't wait to embark on this coding adventure with kids from
        Africa and help them shape a brighter future!
      </p>
    </div>
    <div>
      <h1 class="how">How it works</h1>
      <a v-for="card in cards" :key="card.title" :href="card.link" class="card">
        <h3 v-html="card.title"></h3>
        <p class="text-white fs-5" v-html="card.description"></p>
        <img :src="card.imageSrc" :alt="card.title" class="w-50" />
      </a>
    </div>
  </body>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          title: "1.<br>Login",
          description: "Tell us about yourself",
          imageSrc: "https://i.postimg.cc/rmTyVBXN/key.png",
          link: "/registration",
        },
        {
          title: "2.<br>Browse",
          description: "View all of our coding programs",
          imageSrc: "https://i.postimg.cc/SscYSBTy/browsing-1.png",
          link: "/programs",
        },
        {
          title: "3.<br>Book",
          description:
            "Choose the country based on where the program is located",
          imageSrc: "https://i.postimg.cc/QC0yzyrb/travel.png",
          link: "/flights",
        },
        {
          title: "4.<br>Checkout",
          description: "Purchase your flight ticket",
          imageSrc: "https://i.postimg.cc/HLb7dJkJ/airplane-ticket.png",
          link: "/checkout",
        },
      ],
    };
  },
};
</script>

<style scoped>
.welcome {
  background-color: #6e91b3;
  border-radius: 25px;
  max-width: 1300px;
  margin: 0 auto;
  padding: 50px 20px;
  text-align: center;
}

.title {
  margin-bottom: 30px;
  font-size: 4rem;
  padding-top: 100px;
  color: rgb(27, 61, 102);
}

a {
  text-decoration: none;
}
.description {
  letter-spacing: 5px;
  word-spacing: 5px;
  font-size: 18px;
  line-height: 35px;
  margin-bottom: 20px;
  color: #fefeff;
}

body {
  font-family: "Black Mango Medium";
  background: radial-gradient(
    circle,
    rgba(248, 248, 248, 1) 0%,
    rgb(193, 210, 232) 100%
  );
}
.bg {
  width: 100%;
  object-fit: cover;
  clip-path: inset(0 0 20% 0);
  /* height: 860px */
  /* height: 100vh; */
}

@font-face {
  font-family: "Black Mango Medium";
  src: url("../assets/font/fonts.ttf");
}

h1 {
  font-size: 2rem;
  color: rgb(0, 0, 0);
  font-family: Black Mango Medium;
}

.how {
  font-size: 4rem;
  padding-top: 100px;
  color: rgb(27, 61, 102);
}

/* -------------------------------------------------------CARDS-------------------------------------------------------------- */

.card {
  display: inline-block;
  width: 300px;
  height: 400px;
  background-color: #6e91b3;
  border-radius: 16px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  margin: 30px;
  vertical-align: top;
  box-sizing: border-box;
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-10px);
}

p {
  word-spacing: 0.4rem;
}

h3 {
  font-size: 2.5rem;
  font-family: "Black Mango Medium";
  padding-top: 30px;
  color: rgb(255, 255, 255);
}

/* ----------------------------------Media Queries */


  @media only screen and (min-width: 320px) {
     
}

</style>
