<template>
  <body>
    <div class="container">
      <h2 class="text-center animate__animated animate__zoomIn">Booking Confirmation</h2>
      <div class="table-container">
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
              <td>
                {{ flight.DepartureCity }} ({{ formatDate(flight.DepartureDate) }} {{ flight.DepartureTime }})
              </td>
              <td>
                {{ flight.ArrivalCity }} ({{ formatDate(flight.ArrivalDate) }} {{ flight.ArrivalTime }})
              </td>
              <td>{{ flight.Price }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2">Total:</td>
              <td>{{ totalCost }}</td>
              <td>
                <button class="checkout-button" @click="Checkout(flight)">CheckOut</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
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
  min-height: 100vh;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  max-width: 800px;
  padding: 20px;
  width: 90%;
}

h2 {
  font-size: 3rem;
  font-size: 2rem;
  padding-top: 30px;
  color: rgb(27, 61, 102);
  text-align: center;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  letter-spacing: 1px;
  word-spacing: 3px;
  font-size: 1rem;
  line-height: 1.5;
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

.checkout-button {
  background-color: #0f205a;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.checkout-button:hover {
  background-color: #1b206b;
}

@media screen and (max-width: 768px) {
  table {
    font-size: 0.9rem;
  }

  th,
  td {
    padding: 8px;
  }

  .checkout-button {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
}
</style>