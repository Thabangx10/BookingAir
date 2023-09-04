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
        <li v-for="booking in bookedFlights" :key="booking.ID">
          Flight ID: {{ booking.FlightID }}
          <!-- Display other flight information -->
          <div v-for="flight in flights" :key="flight.ID" v-if="flight.ID === booking.FlightID">
            Flight Details:
            <p>Flight Name: {{ flight.Name }}</p>
            <p>Departure Time: {{ flight.DepartureTime }}</p>
            <p>Destination: {{ flight.Destination }}</p>
            <!-- Add more flight details as needed -->
          </div>
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
    },
    flights() {
      return this.$store.state.flights;
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
