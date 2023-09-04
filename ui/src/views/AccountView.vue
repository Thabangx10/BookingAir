<template>
  <div>
    <h2>User Information</h2>
    <div v-if="user">
      <p>Name: {{ user.FirstName }}</p>
      <p>Surname: {{ user.LastName }}</p>
      <p>Phone Number: {{ user.PhoneNumber }}</p>
      <p>Email: {{ user.Email }}</p>
      <p>Address: {{ user.Address }}</p>
      <p>User Role: {{ user.userRole }}</p>
    </div>
    <div v-else>
      <p>No user information available</p>
    </div>

    <button @click="viewBookedFlights">View Purchased Flights</button>

    <div v-if="bookedFlights.length > 0">
      <h3>Purchased Flights:</h3>
      <ul>
        <li v-for="flight in bookedFlights" :key="flight.FlightID">
          Flight ID: {{ flight.FlightID }}
          <!-- Display other flight information as needed -->
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No purchased flights available</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserAccount",
  computed: {
    user() {
      return this.$store.state.user;
    },
    bookedFlights() {
      return this.$store.state.bookedFlights;
    }
  },
  methods: {
    async viewBookedFlights() {
      // Call the retrieveBookings action to fetch the user's purchased flights
      await this.$store.dispatch('retrieveBookings');
    }
  }
};
</script>
