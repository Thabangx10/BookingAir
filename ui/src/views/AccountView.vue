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
  </div>
</template>

<script>
export default {
  name: "UserAccount",
  computed: {
    user: function () {
      return this.$store.state.user;
    }
  }
};
</script>
