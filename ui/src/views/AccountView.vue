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
    
    <!-- Display the user's booked and purchased flights -->
    <div v-if="bookedFlights.length > 0">
      <h3>Booked and Purchased Flights</h3>
      <ul>
        <li v-for="flight in bookedFlights" :key="flight.id">
          Flight ID: {{ flight.id }} - Destination: {{ flight.Destination }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No booked or purchased flights available</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserAccount",
  computed: {
    user: function () {
      return this.$store.state.user;
    },
    bookedFlights: function () {
      return this.$store.getters.bookedFlights;
    }
  },
  created() {
    this.$store.dispatch("retrieveUser");
    this.$store.dispatch("retrieveUserFlights");
  }
};
</script>
