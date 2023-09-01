<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <h3 id="storeName">CampReserve</h3>
      </a>
      <!-- To make the navbar close because it was not working normally -->
      <button class="navbar-toggler" type="button" @click="toggleNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        :class="{ collapse: !showNav, 'navbar-collapse': true }"
        id="navbarNav"
      >
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link
              class="nav-link text-white"
              to="/"
              active-class="active-link"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-white"
              to="/about"
              active-class="active-link"
              >About</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-white"
              to="/registration"
              active-class="active-link"
              >Apply</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-white"
              to="/programs"
              active-class="active-link"
              >Programs</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-white"
              to="/flights"
              active-class="active-link"
              >Flights</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-white"
              to="/cart"
              active-class="active-link"
              >Cart</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-white"
              to="/contact"
              active-class="active-link"
              >Contact</router-link
            >
          </li>
          <li class="nav-item" v-if="authenticated">
            <router-link
              class="nav-link text-white"
              to="/admin"
              active-class="active-link"
            >
              Admin
            </router-link>
          </li>
          <li class="nav-item" v-else>
            <router-link
              class="nav-link opacity-0"
              to="/registration"
              active-class="active-link"
            >
              Log In
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              v-show="user"
              class="nav-link text-white"
              to="/account"
              active-class="active-link"
              >Account</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      showNav: false,
      FirstName: "",
      LastName: "",
      PhoneNumber: "",
      Email: "",
      Address: "",
      userRole: "",
    };
  },
  computed: {
    authenticated() {
      // Map the 'authenticated' getter from Vuex store to a computed property
      return this.$store.getters.authenticated;
    },
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    toggleNav() {
      this.showNav = !this.showNav;
    },
  },
};
</script>

<style scoped>

/* Navbar Container */

/* NavBar */
#storeName {
  color: rgb(255, 255, 255);
}

.navbar {
  background-color: rgb(27, 61, 102); /* Background color for the navbar */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Add a subtle shadow */
  padding: 10px 0; /* Add padding to the top and bottom */
}

/* Logo Style */
.logo {
  font-family: "Black Mango Medium"; /* Custom font for the logo */
  font-size: 2rem;
  color: white; /* Logo text color */
  margin: 0;
  display: flex;
  align-items: center; /* Center logo vertically */
}

/* Navbar Toggle Icon */
.navbar-toggler-icon {
  background-color: white; /* Toggle button background color */
  border: 2px solid transparent;
  border-radius: 4px;
}

/* Navbar Links Style */
.navbar-nav .nav-link {
  font-family: "Black Mango Medium"; /* Custom font for the links */
  color: white; /* Link text color */
  font-size: 1.2rem;
  margin-right: 20px; /* Adjust spacing between links */
  transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
  color: #ffca4b; /* Link text color on hover */
}



/* Adjustments for Smaller Screens */
@media (max-width: 1075px) {

  .navbar-expand-lg .navbar-nav {
    margin-left: 0; /* Remove left margin for links */
  }

  .navbar-toggler {
    background-color: rgb(27, 61, 102); /* Toggle button background color */
  }
}
</style>
