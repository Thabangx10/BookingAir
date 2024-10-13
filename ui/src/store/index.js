import axios from 'axios';
import { createStore } from 'vuex'
const bStoreURL = "https://campreserve.onrender.com/";

export default createStore({
  state: {
    // user: null,
    message: null,
    loading: false,
    user: [],
    users: [],
    programs: [],
    flights: [],
    bookedFlights: [],
    booking: null,
    bookings: [],
    cart: [],
  },
  mutations: {

    bookFlight(state, flight) {
      state.bookedFlights.push(flight);
    },
    setBookedFlight(state, flight) {
      state.bookedFlights = flight;
    },
    addToCart(state, flight) {
      state.cart.push(flight);
    },
    removeFromCart(state, flight) {
      state.cart = state.cart.filter(f => f !== flight);
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    setMessage (state, payload) {
      state.message = payload
    },

// --------------------------Booking----------------------------------
    setBooking(state, value) {
      state.booking = value
    },
    setBookings(state, values) {
      state.bookings = values
    },
    // ---------------------User---------------------------------------
    setUsers (state, users) {
      state.users = users;
    },
    setUser (state, user) {
      state.user = user;
    },
    addUser(state, users) {
      state.users = users;
    },
    updateUser(state, payload) {
      state.users = state.users.map(user => {
        if (user.id === payload.id) {
          return payload;
        }
        return user;
      });
    },
    deleteUser(state, id) {
      state.users = state.users.filter(user => user.id !== id);
    },

    // --------------------------------Program----------------------------------
    setPrograms (state, programs) {
      state.programs = programs;
    },
    setProgram (state, program) {
      state.program = program;
    },
    addProgram(state, programs) {
      state.programs = programs;
    },
    updateProgram(state, payload) {
      state.programs = state.programs.map(program => {
        if (program.id === payload.id) {
          return payload;
        }
        return program;
      });
    },
    deleteProgram(state, id) {
      state.programs = state.programs.filter(program => program.id !== id);
    },


    // --------------------------FLIGHTS----------------------------------------------
    setFlights (state, flights) {
      state.flights = flights;
    },
    addFlight(state, flights) {
      state.flights = flights;
    },
    setFlight(state, payload) {
      state.flights = state.flights.map(flight => {
        if (flight.id === payload.id) {
          return payload;
        }
        return flight;
      });
    },
    deleteFlight(state, id) {
      state.flights = state.flights.filter(flight => flight.id !== id);
    }
  },


    // ------------------------------------------REGISTER/LOGIN-----------------------------------------------------
    actions: {
    async register (context, payload) {
      console.log(payload);
      const res = await axios.post(`${bStoreURL}register`, payload)
      const { result, err, msg } = await res.data
      if (result) {
        context.commit('setUser', result)
        context.commit('setMessage', msg)
      } else {
        context.commit('setMessage', err)
      }
    },

    async login(context, payload) {
      try {
        context.commit('setLoading', true);  // Set loading state
        // Make the API request to your login endpoint
        const res = await axios.post(`${bStoreURL}login`, payload);
        const { result, err, msg } = res.data;
    
        if (result) {
          // Assuming result is an object that contains the user's information
          context.commit('setUser', result);  // Set the user data
          context.commit('setUserRole', result.userRole || '');  // Set the userRole, default to empty string if undefined
          
          // Store the user information in localStorage
          localStorage.setItem("user", JSON.stringify(result));
    
          // Optional: You can also save the token if it's part of the result
          if (result.token) {
            localStorage.setItem("token", result.token);
          }
    
          context.commit('setMessage', msg);  // Set a success message
        } else {
          context.commit('setMessage', err);  // Handle the error returned from the API
        }
      } catch (error) {
        console.error(error);
        context.commit('setMessage', 'Login failed due to a network error or invalid credentials');
      } finally {
        context.commit('setLoading', false);  // Reset loading state
      }
    }
    ,

  // --------------------------------------------USERS--------------------------------------------------------------
  async retrieveUsers(context) {
    const res = await axios.get(`${bStoreURL}users`);
    const { results, err, msg } = await res.data;
    if(results) {
      context.commit('setUsers', results)
    }else {
      context.commit('setMessage', err || msg)
    }
  },
  async retrieveUser(context, id) {
    const res = await axios.get(`${bStoreURL}user/${id}`);
    const { results } = await res.data;
    if(results) {
      console.log(results[0])
      context.commit('setUser', results[0]);
    }
  },
  // async addUser(context, payload) {
  //   const res = await axios.post(`${bStoreURL}register`, payload);
  //   const { result, err, msg } = await res.data;
  //   if (result) {
  //     context.commit('updateUser', result);
  //     context.commit('setMessage', msg)
  //   } else {
  //     context.commit('setMessage', err)
  //   }
  // },
  async updateUser(context, payload) {
    try {
      const res = await axios.put(`${bStoreURL}user/${payload.ID}`, payload);
      const { result, err, msg } = await res.data;
      if (result) {
        context.commit('updateUser', result);
        context.commit('setMessage', msg)
      } else {
        context.commit('setMessage', err)
      }
    } catch (error) {
      console.error(error);
      context.commit('setMessage', 'Error updating user');
    }
  },
  
  async deleteUser(context, id) {
    try {
      const res = await axios.delete(`${bStoreURL}user/${id}`);
      const { err, msg } = await res.data;
      if (msg) {
        context.dispatch('retrieveUsers');
        context.commit('setMessage', msg);
        // window.location.reload(); 
      } else {
        context.commit('setMessage', err)
      }
    } catch (err) {
      context.commit('setMessage', err.message);
    }
  },



  // --------------------------------------------PROGRAMS------------------------------------------------------
  async fetchPrograms(context) {
      const res = await axios.get(`${bStoreURL}programs`);
      const { results, err, msg } = await res.data;
      if(results) {
        context.commit('setPrograms', results)
      }else {
        context.commit('setMessage', err || msg)
      }
    },
    async fetchProgram(context, id) {
      const res = await axios.get(`${bStoreURL}program/${id}`);
      const { results } = await res.data;
      if(results) {
        console.log(results[0])
        context.commit('setProgram', results[0]);
      }
    },
    async addProgram(context, payload) {
      const res = await axios.post(`${bStoreURL}program`, payload);
      const { result, err, msg } = await res.data;
      if (result) {
        context.commit('addProgram', result);
        context.commit('setMessage', msg)
      } else {
        context.commit('setMessage', err)
      }
    },
    async updateProgram(context, payload) {
      try {
        const res = await axios.put(`${bStoreURL}program/${payload.ID}`, payload);
        const { err, msg } = await res.data;
        if (msg) {
          // context.commit('updateProgram', result);
          context.dispatch('retrievePrograms');
          context.commit('setMessage', msg)
        } else {
          context.commit('setMessage', err)
        }
      } catch (error) {
        console.error(error);
        context.commit('setMessage', 'Error updating program');
      }
    },
    
    async deleteProgram(context, id) {
      try {
        const res = await axios.delete(`${bStoreURL}program/${id}`);
        const { err, msg } = await res.data;
        if (msg) {
          // context.commit('deleteProgram', id);
          context.dispatch('fetchPrograms');
          context.commit('setMessage', msg);
          // window.location.reload(); 
        } else {
          context.commit('setMessage', err)
        }
      } catch (err) {
        context.commit('setMessage', err.message);
      }
    },



  // ---------------------------------------------------FLIGHTS--------------------------------------------------

  async fetchFlights(context) {
    const res = await axios.get(`${bStoreURL}flights`);
    const { results, err, msg } = await res.data;
    if(results) {
      context.commit('setFlights', results)
    }else {
      context.commit('setMessage', err || msg)
    }
  },
  async fetchFlight(context, id) {
    const res = await axios.get(`${bStoreURL}flight/${id}`);
    const { results } = await res.data;
    if(results) {
      console.log(results[0])
      context.commit('setFlights', results[0]);
    }
  },
  async addFlight(context, payload) {
    const res = await axios.post(`${bStoreURL}flight`, payload);
    const { result, err, msg } = await res.data;
    if (result) {
      context.commit('updateFlight', result);
      context.commit('setMessage', msg)
    } else {
      context.commit('setMessage', err)
    }
  },
async updateFlight(context, payload) {
  try {
    console.log("Flight object: ", payload);
    const res = await axios.put(`${bStoreURL}flight/${payload.ID}`, payload);
    console.log("response - backend: ", res);
    const { err, msg } = await res.data;
    if (msg) {
      context.dispatch('fetchFlights')
      context.commit('setMessage', msg)
    } else {
      context.commit('setMessage', err)
    }
  } catch (error) {
    console.error(error);
    context.commit('setMessage', 'Error updating flight');
  }
},
  
  
  async deleteFlight(context, id) {
    try {
      const res = await axios.delete(`${bStoreURL}flight/${id}`);
      const { err, msg } = await res.data;
      if (msg) {
        context.dispatch('fetchFlights');
        context.commit('setMessage', msg);
        // window.location.reload(); 
      } else {
        context.commit('setMessage', err)
      }
    } catch (err) {
      context.commit('setMessage', err.message);
    }
  },



  // ---------------------------------Bookings----------------------------------------------


 
  async bookFlight(context, payload){
    try {
      let statusCode  = null;
      let message = null;

      await axios.post(`${bStoreURL}user/${payload.ID}/booking`, payload)
      .then((data)=> {
        statusCode = data.status
 
        message = data
      })
      .then(()=>{
          console.log('Response: ', statusCode);           
          context.commit('setMessage', message.data.msg);
      });
    }
    catch(err) {
      context.commit('setMessage', err);
    }
  },


  async updateBooking(context, payload){
    try{
      let res = await axios.put(`${bStoreURL}user/${payload.ID}/cart/${payload.ID}`, {
        quantity: payload.quantity
      });
      let {msg} = res.data;
      if (res) {
        console.log('Message: ', msg);
        context.commit('setMessage', msg);
      }
    }
    catch(err){
      console.error(err);
    }
  },

  async retrieveBookings(context) {
    let currentUser = JSON.parse(localStorage.getItem('user'));
    try {  
      const res = await axios.get(`${bStoreURL}user/${currentUser?.ID}/bookings`);
      context.commit('setBooking', res.data.results);
    } catch(err) {
      console.error(err);
    }
  },






},

  getters: {
    getUser: state => state.user,
    getMessage: state => state.message,
    getUsers: state => state.users,
    getPrograms: state => state.programs,
    getFlights: state => state.flights,
    authenticated(state) {
      return state.user !== null;
    },
    flights(state) {
      return state.flights;
    },
    bookedFlights(state) {
      return state.bookedFlights;
    },
    totalCost: state => {
      let total = 0;
      for (const flight of state.bookedFlights) {
        total += flight.Price;
      }
      return total;
    },
  }
  });



