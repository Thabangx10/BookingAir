<template>
  <NavBarVue></NavBarVue>
  <div class="container-fluid min-vh-100 p-0">
  <router-view/>
  </div>
<FooterVue></FooterVue>
</template>

<script>
import NavBarVue from './components/NavBar.vue';
import FooterVue from './components/Footer.vue';


export default {
components:{
  NavBarVue,
  FooterVue,
}
}

</script>
<style>
  .body{
	margin:0;
	padding:20px;
  background: radial-gradient(circle, rgba(248, 248, 248, 1) 0%, rgb(193, 210, 232) 100%);
  font-family: 'Black Mango Medium';
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
