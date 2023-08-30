<template>
  <body>
    <div>
      <h2 class="text-center animate__animated animate__zoomIn">Flight Booking</h2>
      <form class="flight-form" @submit.prevent="searchFlights">
        <div class="col-md-6 form-group">
          <label for="departure">Departure</label>
          <select v-model="selectedDepartureCity">
            <option value="">From:</option>
            <option v-for="DepartureCity in DepartureCities" :key="DepartureCity">{{ DepartureCity }}</option>
          </select>
        </div>
        <div class="col-md-6 form-group">
          <label for="destination">Destination</label>
          <select v-model="selectedArrivalCity">
            <option value="">To:</option>
            <option v-for="ArrivalCity in ArrivalCities" :key="ArrivalCity">{{ ArrivalCity }}</option>
          </select>
        </div>
        <div class="col-md-12">
          <button v-if="authenticated" class="search">Search Flights</button>
          <div v-else>
            <router-link to="/registration"><button class="search">Login to Search</button></router-link>
          </div>
        </div>
      </form>
      <div v-if="searchedFlights.length > 0">
        <h3>Available Flights</h3>
        <div class="card" v-for="flight in searchedFlights" :key="flight.id">
          <div class="flight-details">
            <p class="flight-route">{{ flight.DepartureCity }} to {{ flight.ArrivalCity }}</p>
            <div class="flight-timings">
              <p class="departure-time">Departure: {{ formatDate(flight.DepartureDate) }}, <br> Time: {{ flight.DepartureTime }}</p>
              <p class="arrival-time">Arrival: {{ formatDate(flight.ArrivalDate) }}, <br> Time: {{ flight.ArrivalTime }}</p>
            </div>
            <p class="flight-price">Price: {{ flight.Price }}</p>
            <button class="book-button" @click="bookFlight(flight)">Book Now</button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <img src="https://i.postimg.cc/VNSRJnww/output-onlinegiftools.gif" alt="" class="loop-animation">
    </div>
  </body>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      selectedDepartureCity: '',
      selectedArrivalCity: '',
      selectedDepartureDate: '',
      searchedFlights: [],
      userID: '',
      flightsID: ''
    };
  },
  computed: {
        // Map the 'authenticated' getter from Vuex store to a computed property
        ...mapGetters(['authenticated']),
    // Get the list of flights from the Vuex store
    flights() {
  const flights = this.$store.state.flights;
  console.log('flights:', flights);
  return flights;
},
formatDate() {
    return function(date) {
      const d = new Date(date);
      return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };
  },
    DepartureCities() {
      const DepartureCities = new Set();
      for (const flight of this.flights) {
        DepartureCities.add(flight.DepartureCity);
      }
      return Array.from(DepartureCities);
    },
    ArrivalCities() {
      const ArrivalCities = new Set();
      for (const flight of this.flights) {
        ArrivalCities.add(flight.ArrivalCity);
      }
      return Array.from(ArrivalCities);
    },
  },
  methods: {
    searchFlights() {
      this.searchedFlights = this.flights.filter(flight => {
        return (
          flight.DepartureCity === this.selectedDepartureCity &&
          flight.ArrivalCity === this.selectedArrivalCity
        );
      });
    },
    bookFlight(flight) {
  // Set the booked flight in the Vuex store
  this.$store.commit('bookFlight', flight);
  // Redirect the user to the booking confirmation page
  this.$router.push("/cart");
}
  },
  created() {
    console.log('authenticated:', this.authenticated);
    // Fetch the list of flights from the Vuex store
    this.$store.dispatch('fetchFlights');
  },
}
</script>






  
  <style scoped>


.card {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
  margin-top: 50px;
  background-color: #f1f1f1;
  letter-spacing: 0.1rem;
}

.flight-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  letter-spacing: 0.1rem;
}

.flight-route {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  letter-spacing: 0.1rem;
}

.flight-timings {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0;
  letter-spacing: 0.1rem;
}

.departure-time, .arrival-time {
  font-size: 16px;
  font-weight: 800;
  margin: 0;
  letter-spacing: 0.1rem;
}

.flight-price {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
  letter-spacing: 0.1rem;
}

.book-button {
  background-color:  #21507e;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  letter-spacing: 0.1rem;
}

.book-button:hover {
  background-color: #21467c;
}

  
h2{
  font-size: 4rem;
  padding-top: 30px;
  color: rgb(27, 61, 102);
}

.flight-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
  margin-top: 50px;
  background-color: #f1f1f1;
}

.flight-form h2 {
  margin-top: 0;
  letter-spacing: 0.1rem;
}

.form-group {
  width: 49%;
  margin-bottom: 20px;
  letter-spacing: 0.1rem;
}

.form-group label {
  font-weight: bold;
}
.form-group input, .form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.1rem;
}

.search {
  width: 100%;
  padding: 10px;
  background-color: #21507e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  letter-spacing: 0.1rem;
}

.search:hover {
  background-color: #21467c;
}

  h1 {
    font-size: 6rem;
    font-family: 'Concert One', cursive;
    color: black;
  }
  
  body{
    height: 100vh; 
    width: 100%; 
    overflow: hidden;
  background: radial-gradient(circle, rgba(248,248,248,1) 0%,  rgb(193, 210, 232)100%);
  font-family: 'Black Mango Medium';
  letter-spacing: 0.1rem;
  }
  
  .clean {
    position: relative;
    width: 100%;
  }
  
  .fade-top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 20%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #ffffff);
  }
  
  .clean img {
    width: 100%;
  }
  
  .loop-animation {
    animation: loop 8s linear infinite;
    width: 200px;
    /* filter: brightness(0) invert(1); */
  }
  
  @keyframes loop {
    0% {
      transform: translateX(-350%);
    }
    100% {
      transform: translateX(400%);
    }
  }
  </style>
  