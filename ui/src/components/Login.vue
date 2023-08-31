<template>
  <body>
    <h1 class="text-center animate__animated animate__zoomIn">Login</h1>
    <div class="container">
      <div class="row">
        <div class="col-md-6 image1"></div>
        <div class="col-md-6 right">
          <div class="inputText">
            <header class="text-black pb-5 fw-bold">Login</header>
            <form @submit.prevent="login">
              <div>
                <input
                  type="text"
                  class="input"
                  v-model="Email"
                  placeholder="Email"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  class="input"
                  v-model="UserPassword"
                  placeholder="Password"
                  required
                />
              </div>
              <div>
                <button class="submit" :disabled="isLoading">
                  <span v-if="isLoading">
                    <i class="fa-solid fa-circle-notch fa-spin"></i> Loading...
                  </span>
                  <span v-else> Submit </span>
                </button>
              </div>
            </form>
            <div class="login fw-bold text-black">
              <span
                >Don't have an account?
                <a href="#"
                  ><router-link to="/registration">Register</router-link>
                </a></span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>
<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      Email: "",
      UserPassword: "",
      isLoading: false,
    };
  },
  computed: {
    message() {
      return this.$store.state.message;
    },
  },
  methods: {
    async login() {
      this.isLoading = true;
      const userData = {
        Email: this.Email,
        UserPassword: this.UserPassword,
      };
      try {
        await this.$store.dispatch("login", userData);
        Swal.fire("Success", "Login successful");
        // Redirect the user to the program page on successful login
        this.$router.push("/programs");
      } catch (error) {
        console.log(error.message);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
body {
  background: radial-gradient(
    circle,
    rgba(248, 248, 248, 1) 0%,
    rgb(193, 210, 232) 100%
  );
  font-family: "Black Mango Medium";
  margin: auto;
  min-height: 100vh;
}

h1 {
  margin-bottom: 20px;
  font-size: 4rem;
  padding-top: 70px;
  color: rgb(27, 61, 102);
  text-align: center;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 150px;
}

.row {
  width: 900px;
  height: 540px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.2);
  margin-top: 50px;
}

.image1 {
  background-image: url("https://i.postimg.cc/ZqZMLvSt/pexels-pnw-production-7625031.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  border-radius: 10px 0 0 10px;
}

.text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.text p {
  color: #fff;
  font-size: 18px;
}

i {
  font-weight: 400;
  font-size: 15px;
}

.right {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.input {
  height: 45px;
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  outline: none;
  margin-bottom: 20px;
  color: #40414a;
}

.submit {
  border: none;
  outline: none;
  height: 45px;
  background: #ececec;
  border-radius: 5px;
  transition: 0.4s;
  padding-right: 150px;
  padding-left: 150px;
}

.submit:hover {
  background: rgba(37, 95, 156, 0.9);
  color: #fff;
}

.login {
  text-align: center;
  font-size: small;
  margin-top: 25px;
}

span a {
  text-decoration: none;
  font-weight: 700;
  color: #000;
  transition: 0.5s;
}

span a:hover {
  text-decoration: underline;
  color: #000;
}

@media only screen and (max-width: 768px) {
    h1 {
        font-size: 2.5rem;
        padding-top: 50px;
    }

    .row {
        height: auto;
        border-radius: 0;
        box-shadow: none;
        margin-top: 0;
    }

    .image1 {
        height: 200px;
        border-radius: 0;
    }

    .text {
        top: 30%;
    }

    .right {
        padding: 20px;
    }

    .input,
    #userRole {
        height: 35px;
        margin-bottom: 10px;
    }

    .submit {
        height: 35px;
        padding: 0 20px;
    }

    .login {
        margin-top: 10px;
    }
}
</style>

<!-- https://www.divinectorweb.com/2023/02/login-and-signup-form-switch-javascript.html -->
