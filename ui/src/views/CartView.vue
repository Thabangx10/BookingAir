<template>
  <body>
    <div>
      <h2 class="text-center animate__animated animate__zoomIn">Booking Confirmation</h2>
      <table>
        <thead>
          <tr>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(flight, index) in bookedFlights" :key="index">
            <td>{{ flight.DepartureCity }} ({{ formatDate(flight.DepartureDate) }} {{ flight.DepartureTime }})</td>
            <td>{{ flight.ArrivalCity }} ({{ formatDate(flight.ArrivalDate) }} {{ flight.ArrivalTime }})</td>
            <td>{{ flight.Price }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2">Total:</td>
            <td>{{ totalCost }}</td>
            <td><button @click="Checkout(flight)">CheckOut</button></td>
          </tr>
        </tfoot>
      </table>
    </div>
  </body>
</template>

<script>
 import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['bookedFlights', 'totalCost']),
  },
  methods: {
      ...mapActions(['removeFlight']),
      formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString();
      },
      async Checkout() {
    this.$router.push("/checkout");
  }
}
}
</script>

<style scoped>
body {
  background: radial-gradient(
    circle,
    rgba(248, 248, 248, 1) 0%,
    rgb(193, 210, 232) 100%
  );
  font-family: "Black Mango Medium";
  height: 100vh;
}

h2 {
  font-size: 4rem;
  padding-top: 30px;
  color: rgb(27, 61, 102);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  letter-spacing: 3px;
  word-spacing: 5px;
  font-size: 17px;
  line-height: 35px;
}

th,
td {
  text-align: left;
  padding: 12px;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
}

tr:hover {
  background-color: #e8e8e8;
}

button {
  background-color: #0f205a;
  color: white;
  border: none;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #1b206b;
}


@media screen and (min-width: 320px) {
  h2 {
    font-size: 3rem; /* Reduce the font size for smaller screens */
  }

  table {
    font-size: 14px; /* Reduce the font size for table content */
    line-height: 25px; /* Adjust the line height for readability */
  }

  th,
  td {
    padding: 8px; /* Reduce the cell padding for smaller screens */
  }

  button {
    font-size: 12px; /* Reduce the button font size */
    padding: 6px 12px; /* Adjust button padding for smaller screens */
  }
}
</style>
