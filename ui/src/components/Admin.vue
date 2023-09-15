<template>
  <div class="body">
    <h1 class="animate__animated animate__zoomIn">Programs</h1>
    <div v-if="loading">
      <Spinner />
    </div>
    <div v-else>
      <table class="table">
        <thead>
          <tr class="program">
            <th>Program Name</th>
            <th>Location</th>
            <th>Period</th>
            <th>Program Description</th>
            <th>Image</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr class="program" v-for="program in programs" :key="program.id">
            <td data-label="Program Name">{{ program.ProgramName }}</td>
            <td data-label="Location">{{ program.Location }}</td>
            <td data-label="Period">{{ program.Period }}</td>
            <td data-label="Program Description">
              {{ program.ProgramDescription }}
            </td>
            <td data-label="Image">
              <img :src="program.imgURL" alt="Program Image" />
            </td>
            <td>
              <button @click="showEditModal(program)">Edit</button>
              <button @click="deleteProgram(program.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="showAddModal">Add Program</button>
    </div>
  </div>
</template>

<script>
import Spinner from "../components/Spinner.vue";

export default {
  name: "Admin",
  components: {
    Spinner,
  },
  computed: {
    programs() {
      return this.$store.state.programs;
    },
    loading() {
      return this.$store.state.loading;
    },
  },
  data() {
    return {
      showModal: false,
      editingProgram: false,
      modalTitle: "",
      modalAction: "",
      form: {
        ProgramName: "",
        Location: "",
        Period: "",
        ProgramDescription: "",
        imgURL: "",
      },
    };
  },
  created() {
    this.fetchPrograms();
  },
  methods: {
    async fetchPrograms() {
      this.$store.commit("setLoading", true);
      try {
        await this.$store.dispatch("fetchPrograms");
      } catch (error) {
        console.error(error);
      } finally {
        this.$store.commit("setLoading", false);
      }
    },

    showAddModal() {
      this.modalTitle = "Add Program";
      this.modalAction = "Add";
      this.form = {
        ProgramName: "",
        Location: "",
        Period: "",
        ProgramDescription: "",
        imgURL: "",
      };
      this.showModal = true;
    },

    showEditModal(program) {
      this.modalTitle = "Edit Program";
      this.modalAction = "Update";
      this.form = { ...program };
      this.editingProgram = true;
      this.showModal = true;
    },

    async submitForm() {
      if (this.editingProgram) {
        // Update program
        try {
          await this.$store.dispatch("updateProgram", this.form);
          console.log("Program updated successfully");
        } catch (err) {
          console.error(err);
        } finally {
          this.showModal = false;
          this.editingProgram = false;
        }
      } else {
        // Add program
        try {
          const response = await this.$store.dispatch("addProgram", this.form);
          const { result, err } = response.data;
          if (result) {
            console.log("Program added successfully");
          } else {
            console.error(err || "Error adding program");
          }
        } catch (err) {
          console.error(err);
        } finally {
          this.showModal = false;
        }
      }
    },

    cancelForm() {
      this.showModal = false;
      this.editingProgram = false;
    },

    async deleteProgram(programId) {
      console.log("Program ID: ", programId);
      if (confirm("Are you sure you want to delete this program?")) {
        try {
          await this.$store.dispatch("deleteProgram", programId);
          console.log("Program deleted successfully");
        } catch (err) {
          console.error(err);
        }
      }
    },
  },
};
</script>

<style scoped>
.body {
  margin: 0;
  padding: 20px;
  background: radial-gradient(
    circle,
    rgba(248, 248, 248, 1) 0%,
    rgb(193, 210, 232) 100%
  );
  font-family: "Black Mango Medium";
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

* {
  box-sizing: border-box;
}

img {
  width: 250px;
  object-fit: contain;
}

h1 {
  margin-top: 30px;
  font-size: 4rem;
  color: rgb(27, 61, 102);
  text-align: center;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
}

.table td,
.table th {
  padding: 12px 15px;
  border: 1px solid rgb(27, 61, 102);
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: black;
  margin: 0;
  letter-spacing: 0.1rem;
}

.table th {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  letter-spacing: 0.1rem;
  color: #000000;
}

button {
  background-color: rgb(27, 61, 102);
  color: #fff;
  border: none;
  border-radius: 4px;
  margin: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:hover {
  background-color: #0056b3;
}

.program {
  transition: all 0.2s ease;
}

.program:hover {
  background-color: #f2f2f2;
}

/* Remove table header for small screens */
@media (min-width: 320px) {
  .table th,
  .table td {
    display: block;
  }
  .table th {
    display: none;
  }
  .table td {
    text-align: right;
    position: relative;
  }
  .table td::before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 50%;
    padding-left: 15px;
    font-size: 15px;
    font-weight: bold;
    text-align: left;
    display: none;
  }
  img {
    width: 100%;
    max-width: 200px;
    height: auto;
    object-fit: cover;
  }
}
</style>
