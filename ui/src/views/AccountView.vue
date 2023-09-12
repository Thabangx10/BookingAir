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
    <!-- checking booked logic for user flights -->
    <div v-else>
      <p>No user information available</p>
    </div>
    <button @click="viewBookingHistory">View Booking History</button>

    <div v-if="bookedHistory.length > 0">
      <h3>Booking History:</h3>
      <ul>
        <li v-for="booking in bookedHistory" :key="booking.ID">
          <p>Booking ID: {{ booking.ID }}</p>
          <p>Booking Date: {{ booking.Date }}</p>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No booking history available</p>
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
    bookedHistory() {
      return this.$store.getters.getBookedHistory;
    },
  },
  methods: {
    async viewBookingHistory() {
      await this.$store.dispatch('fetchBookingHistory', this.userID);
    },
    filteredFlights(flightID) {
      return this.$store.state.flights.filter(flight => flight.ID === flightID);
    }
  }
};
</script>
