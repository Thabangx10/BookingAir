import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import FlightView from '../views/FlightsView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import LoginView from '../views/LoginView.vue'
import AccountView from '../views/AccountView.vue'
import ProgramsView from '../views/ProgramsView.vue'
import AdminView from '../views/AdminView.vue'
import CartView from '../views/CartView.vue'
import ProgramDetails from '../components/ProgramDetails.vue';
import FlightDetails from '../components/FlightDetails.vue';
import CheckOutView from '../views/CheckOutView.vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  {
    path: '/flights',
    name: 'flights',
    component: FlightView
  },
  {
    path: '/registration',
    name: 'registration',
    component: RegistrationView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/account',
    name: 'account',
    component: AccountView
  },
  {
    path: '/programs',
    name: 'programs',
    component: ProgramsView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView
  },
  {
    path: '/program/:id',
    name: 'program',
    component: ProgramDetails
  },
  {
    path: '/flight/:id',
    name: 'flight',
    component: FlightDetails
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckOutView
  }
];




const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
