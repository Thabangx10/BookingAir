<template>
  <body>
    <div class="container">
      <h1 class="text-center py-5">Program Details</h1>
      <div class="row justify-content-center align-items-center">
        <div class="col-md-6">
          <div class="program-photo"><img :src="program.imgURL" /></div>
        </div>
        <div class="col-md-6">
          <div class="program-info">
            <h2 class="program-name text-uppercase">
              {{ program.ProgramName }}
            </h2>
            <p><strong>Location:</strong> {{ program.Location }}</p>
            <p><strong>Period:</strong> {{ program.Period }}</p>
            <p>
              <strong>Description:</strong> {{ program.ProgramDescription }}
            </p>
            <button class="search" @click.prevent="goToFlightsPage">Book Your Flight</button>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
export default {
  computed: {
    program: function () {
      return this.$store.state.program;
    },
  },
  created() {
    this.$store.dispatch("fetchProgram", this.$route.params.id);
  },
  methods: { 
    goToFlightsPage() { 
      this.$router.push("/flights"); 
  }, 
}, 
};
</script>

<style scoped>
body {
  background: radial-gradient(circle, rgba(248, 248, 248, 1) 0%, rgb(193, 210, 232) 100%);
  font-family: "Black Mango Medium", sans-serif;
  height: 100vh;
}

h1 {
  margin-bottom: 30px;
  font-size: 4rem;
  padding-top: 70px;
  color: rgb(27, 61, 102);
}

.program-photo img {
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.program-info {
  padding: 0 20px;
}

.program-name {
  font-size: 36px;
  letter-spacing: 0.1rem;
  word-spacing: 0.2rem;
  line-height: 40px;
  margin-bottom: 20px;
  color: rgb(27, 61, 102);
}

.program-info p {
  margin-bottom: 10px;
  font-size: 20px;
  letter-spacing: 0.1rem;
  word-spacing: 0.2rem;
  line-height: 40px;
  font: 900;
  color: rgb(27, 61, 102);
}

strong {
  font-weight: bold;
}

.search {
  padding: 10px;
  margin-top: 20px;
  background-color: #21507e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  letter-spacing: 0.1rem;
}
</style>
