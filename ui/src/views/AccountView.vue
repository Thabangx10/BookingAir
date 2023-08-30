<template>
  <body class="bg">
    <div class="container">
      <div class="info">
        <h2>User Information</h2>
        <p>Name : {{ user.FirstName }}</p>
        <p>Surname : {{ user.LastName }}</p>
        <p>PhoneNumber : {{ user.PhoneNumber }}</p>
        <p>Email : {{ user.Email }}</p>
        <p>Address : {{ user.Address }}</p>
        <p>User Role : {{ user.userRole }}</p>
      </div>
    </div> 
  </body>
</template>

<script>
export default {
  name: 'User Account',
  data() {
    return {
      FirstName: '',
      LastName: '',
      PhoneNumber: '',
      Email: '',
      Address: '',
      userRole: '',
    }
  },

  methods: {
    updateUser: function (user) {
      return this.$store.dispatch('updateUser', {
          userID: user.userID,
          FirstName: user.FirstName,
          LastName: user.LastName,
          PhoneNumber: user.PhoneNumber,
          Email: user.Email,
          Address: user.Address,
          UserPassword: user.UserPassword,
          userRole: user.userRole,
        })
        .then((updatedUser) => {
          console.log(updatedUser);
          this.user = updatedUser;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  computed: {
    user: function () {
      return this.$store.state.user;
    },
  },

  created() {
    this.$store.dispatch('retrieveUser');
  },
};
</script>


<style scoped>
.bg {
    background: radial-gradient(circle, rgba(248, 248, 248, 1) 0%, rgb(193, 210, 232) 100%);
    font-family: 'Black Mango Medium';
    font-size: 17px;
    color: rgb(27, 61, 102);
    font-weight: bold;
    letter-spacing: 0.1rem;
    word-spacing: 0.2rem;
    line-height: 40px;
    height: 100vh;
}
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
;
}

h2 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
}

p {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  text-align: center;
}

img {
  max-width: 200px;
  height: auto;
  border-radius: 50%;
  margin-bottom: 1rem;
}

div[v-else] p {
  font-size: 1.2rem;
  margin-top: 1rem;
  text-align: center;
}

</style>
