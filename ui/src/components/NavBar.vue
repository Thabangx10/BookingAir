<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <h3>
          <img src="https://i.postimg.cc/SxKs9wy0/charity.png" alt="logo" class="logo">
          Volunteer Ventures
        </h3>
      </a>
      <!-- To make the navbar close because it was not working normally -->
      <button class="navbar-toggler" type="button" @click="toggleNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div :class="{'collapse': !showNav, 'navbar-collapse': true}" id="navbarNav">
        <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/" active-class="active-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/about" active-class="active-link">About</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/registration" active-class="active-link">Apply</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/programs" active-class="active-link">Programs</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/flights" active-class="active-link">Flights</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/cart" active-class="active-link">Cart</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/contact" active-class="active-link">Contact</router-link>
        </li>
        <li class="nav-item" v-if="authenticated">
          <router-link class="nav-link text-white" to="/admin" active-class="active-link">
            Admin
          </router-link>
        </li>
        <li class="nav-item" v-else>
          <router-link class="nav-link opacity-0 " to="/registration" active-class="active-link">
            Log In
          </router-link>
        </li>
        <li class="nav-item">
          <router-link v-show="user" class="nav-link text-white" to="/account" active-class="active-link">Account</router-link>
        </li>
      </ul>
          </div>
    </div>
  </nav>
  
  </template>
  
  <script>
  export default {
      name: 'NavBar',
      data() {
          return {
            showNav: false,
            FirstName: '',
            LastName: '',
            PhoneNumber: '',
            Email: '',
            Address: '',
            userRole: '',
          }
      },
      computed: {
        authenticated() {
      // Map the 'authenticated' getter from Vuex store to a computed property
      return this.$store.getters.authenticated;
    },
          user() {
              return this.$store.state.user
          },
      },
      methods: {
    toggleNav() {
      this.showNav = !this.showNav
    }
  }
      
  }
  </script>

  <style scoped>
  
  .active-link {
  text-decoration: none;
  border-bottom: 2px solid rgb(255, 255, 255); 
  }
  
  /* nav a.router-link-exact-active[data-v-4295d220] {
      color: rgb(255, 255, 255);
  } */
  
  @font-face {
        font-family: 'Black Mango Medium';
        src: url('../assets/font/fonts.ttf');
    }
  .nav-item {
    font-family: 'Black Mango Medium';
    word-spacing: 1rem;
    letter-spacing: 0.1rem;
    padding: 13px;
    font-size: larger;
    font-weight: lighter;
  }
  
  h3{
    font-family: 'Black Mango Medium';
    font-size: 1.7rem;
  }
  
  .logo{
    width: 3.5rem;
    padding-right: 15px;
    filter: brightness(0) invert(1);
  }
  .navbar {
    background: rgb(27, 61, 102) ;
  /* background: radial-gradient(circle, rgba(248,248,248,1) 0%, rgba(115,173,242,1) 100%); */
  }
  
  .navbar-expand-lg .navbar-nav {
  
      margin-left: 200px;
  }
  
  nav a {
    color: white;
    text-decoration: none;
    font-size: medium;
  }
  
  nav a.router-link-exact-active {
    color: black;
  }

  @media (max-width: 1075px) {
  .logo {
    display: none;
  }
  h3{
    font-size: 1.3rem;
  }
}
  </style>