<template>
  <div class="bg">
    <h1 class="text-center animate__animated animate__zoomIn">Programs</h1>
    <div class="filters pb-5">
      <!-- FILTER -->
      <label for="location" class="px-3">Filter by location:</label>
      <select v-model="selectedLocation">
        <option value="">All Locations</option>
        <option v-for="location in locations" :key="location">{{ location }}</option>
      </select>
      
      <!-- SORT BY -->
      <label for="location" class="px-3">Sort by:</label>
      <button class="sort-button mx-3" @click="toggleSortOrder">Program Name {{ sortOrder }}</button>
      
      <!-- SEARCH -->
      <label for="search" class="px-3">Search:</label>
      <input id="search" v-model="searchQuery" type="text" placeholder="Search programs...">
    </div>
    <div v-if="loading">
      <Spinner></Spinner>
    </div>
    <div v-else class="card-container">
      <div class="card" v-for="program in sortedPrograms" :key="program.id">
        <div class="card-img">
          <a :href="program.photoLink" target="_blank"><img :src="program.imgURL" /></a>
        </div>
        <div class="card-details">
          <h2>{{ program.Location }}</h2>
          <p>{{ program.ProgramName }}</p>
          <p>{{ program.Period }}</p>
          <!-- <p>{{ program.ProgramDescription }}</p> -->
          <router-link v-if="authenticated" :to="{ name: 'program', params: { id: program.ID } }">
            <button class="view-more-button">View More</button>
          </router-link>
          <div v-else>
            <router-link to="/registration"><button class="view-more-button">Log in to view more</button></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Spinner from '../components/Spinner.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'Admin',
  components: {
    Spinner,
  },
  computed: {
    // Map the 'authenticated' getter from Vuex store to a computed property
    ...mapGetters(['authenticated']),

    // Get the list of programs from the Vuex store
    programs() {
      return this.$store.state.programs;
    },
    loading() {
      return this.$store.state.loading;
    },

    // Get a list of unique locations from the programs
    locations() {
      const locations = new Set();
      for (const program of this.programs) {
        locations.add(program.Location);
      }
      return Array.from(locations);
    },

    // Filter the programs by the selected location and search query
    filteredPrograms() {
      let filtered = this.programs;

      // If a location is selected, filter by that location
      if (this.selectedLocation) {
        filtered = filtered.filter(program => program.Location === this.selectedLocation);
      }

      // If a search query is entered, filter by program name
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(program => program.ProgramName.toLowerCase().includes(query));
      }
      return filtered;
    },

    // Sort the filtered programs by program name
    sortedPrograms() {
      const sorted = [...this.filteredPrograms].sort((a, b) => a.ProgramName < b.ProgramName ? (this.sortOrder === 'ascending' ? -1 : 1) : (a.ProgramName > b.ProgramName ? (this.sortOrder === 'ascending' ? 1 : -1) : 0));
      return sorted;
    }
  },
  data() {
    return {
      selectedLocation: '',
      sortOrder: '(ascending)',
      searchQuery: '',
    };
  },

  created() {
  console.log('authenticated:', this.authenticated);
  this.$store.commit('setLoading', true); // True will show the spinner
  this.$store.dispatch('fetchPrograms').then(() => {
    this.$store.commit('setLoading', false); // False will hide the spinner after the programs are fetched
    this.loading = false; // Add this line to set loading to false
  });
},

  methods: {
    // Toggle the sort order between ascending and descending
    toggleSortOrder() {
      this.sortOrder = this.sortOrder === 'ascending' ? 'descending' : 'ascending';
    },
  },
};
</script>



<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Black Mango Medium';
}

.bg {
  background: radial-gradient(circle, rgba(248, 248, 248, 1) 0%, rgb(193, 210, 232)100%);
  letter-spacing: 0.1rem;
  word-spacing: 0.2rem;
  line-height: 40px;
}

h1 {
  text-align: center;
  margin-bottom: 50px;
  font-size: 4rem;
  padding-top: 70px;
  color: rgb(27, 61, 102);
}


.card-container {
  max-width: 1500px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  padding: 0 2rem;
  padding-bottom: 100px;
}


.card {
  position: relative;
  width: 400px;
  height: auto;
  overflow: hidden;
  border-radius: 0.5rem;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  background-color: #6e91b3;
  border: #6e91b3;
}


.card a {
  display: block;
  overflow: hidden;
  position: relative;
}

.card-details {
  background-color: #6e91b3;
}

.card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease-in-out;
}

.card-body {
  padding: 1.5rem;
  background-color: #6e91b3;
}

h2 {
  margin-bottom: 0.5rem;
  font-size: 2rem;
  color: white;
}

p {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: white;
}

.view-more-button {
  margin-bottom: 30px;
}


.view-more-button,
option,
select,
.sort-button {
  padding: 0.5rem 1rem;
  background-color: rgb(27, 61, 102);
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

input {
  border-radius: 5px;
  padding: 5px;
}

.view-more-button:hover {
  background-color: rgb(55, 98, 151);
}

@media (max-width: 768px) {

  h1{
    font-size: 3rem;
  }
  .card {
    margin-bottom: 1.5rem;
  }
  .filters {
    flex-direction: column;
    align-items: flex-start;
  }
  label {
    margin-bottom: 0.5rem;
  }
  select, input {
    margin-bottom: 1rem;
    width: 100%;
  }
}
</style>

