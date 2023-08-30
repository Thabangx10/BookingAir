<template>
  <div class="checkout-container">
    <h2>Checkout</h2>
    <form>
      <div class="form-group">
        <label for="card-number">Card Number:</label>
        <input type="text" id="card-number" name="card-number" required>
      </div>
      <div class="form-group">
        <label for="expiration-date">Expiration Date:</label>
        <input type="text" id="expiration-date" name="expiration-date" required>
      </div>
      <div class="form-group">
        <label for="cvv">CVV:</label>
        <input type="text" id="cvv" name="cvv" required>
      </div>
      <button type="submit" @click.prevent="purchaseFlight">Purchase Flight</button>
    </form>
    <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title m-auto">Flight bought</p>
          <button class="delete" aria-label="close" @click="showModal = false">
            <i class="fa-solid fa-x"></i>
        </button>
        </header>
        <section class="modal-card-body">
          Congratulations! You have successfully purchased the flight.
        </section>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    purchaseFlight() {
      this.showModal = true;
    },
  },
};
</script>
  
<style scoped>
.modal {
  display: none;
  align-items: center;
  justify-content: center;
}
.modal.is-active {
  display: flex;
}

.modal-card {
  width: 400px;
  max-width: 90%;
  color: white;
  background-color:rgb(27, 61, 102);
  border-radius: 6px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  z-index: 11;
}
.modal-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #dbdbdb;
  border-radius: 6px 6px 0 0;
}
.modal-card-title {
  font-size: 1.25rem;
  font-weight: bold;
}
.modal-card-body {
  padding: 1rem;
  font-size: 1.1rem;
}
.delete {
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 20px;
  height: 20px;
  opacity: 0.3;
  transition: opacity 0.2s ease-in-out;
}




.checkout-container {
    background: radial-gradient(circle, rgba(248, 248, 248, 1) 0%, rgb(193, 210, 232) 100%);
  font-family: 'Black Mango Medium';
  font-size: 17px;
  color: rgb(27, 61, 102);
  /* font-weight: bold; */
  letter-spacing: 0.1rem;
  word-spacing: 0.2rem;
  line-height: 40px;
  height: 100vh;
}

h2{
    margin-bottom: 30px;
    font-size: 3.5rem;
    padding-top: 30px;
    color: rgb(27, 61, 102);
    text-align: center;
}



.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: bold;
}

input {
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button[type="submit"] {
  padding: 10px;
  font-size: 16px;
  background-color: #224074;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #354fa3;
}
    
</style>