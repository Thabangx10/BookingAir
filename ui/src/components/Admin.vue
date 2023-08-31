<template>
  <div class="body">
    <h1 animate__animated animate__zoomIn>Programs</h1>
    <div v-if="loading">
      <Spinner/>
    </div>
    <div v-else>
      <table class="table">
        <thead>
          <tr class="program">
            <th>Program Name</th>
            <th>Location</th>
            <th>Period</th>
            <th>Program Description</th>
            <th>Image URL</th>
            <th><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                @click="showAddModal">Add Program</button></th>
          </tr>
        </thead>
        <tbody>
          <tr class="program" v-for="program in programs" :key="program.id">
            <td data-label="Program Name">{{ program.ProgramName }}</td>
            <td data-label="Location">{{ program.Location }}</td>
            <td data-label="Period">{{ program.Period }}</td>
            <td data-label="Program Description">{{ program.ProgramDescription }}</td>
            <td data-label="Image URL"><img :src="program.imgURL" /></td>
            <td>
              <button @click="showEditModal(program)">Edit</button>
              <button @click="deleteProgram(program)">Delete</button>
              <!-- Add Program Modal -->
              <div class="modal" tabindex="-1" role="dialog" :class="{ 'd-block': showModal }">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">{{ modalTitle }}</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="cancelForm"></button>
                    </div>
                    <div class="modal-body">
                      <form @submit.prevent="submitForm">
                        <div class="mb-3">
                          <label for="program-name" class="form-label">Program Name:</label>
                          <input id="program-name" v-model="form.ProgramName" required class="form-control" />
                        </div>
                        <div class="mb-3">
                          <label for="location" class="form-label">Location:</label>
                          <input id="location" v-model="form.Location" required class="form-control" />
                        </div>
                        <div class="mb-3">
                          <label for="period" class="form-label">Period:</label>
                          <input id="period" v-model="form.Period" required class="form-control" />
                        </div>
                        <div class="mb-3">
                          <label for="program-description" class="form-label">Program Description:</label>
                          <textarea id="program-description" v-model="form.ProgramDescription" required
                            class="form-control"></textarea>
                        </div>
                        <div class="mb-3">
                          <label for="img-url" class="form-label">Image URL:</label>
                          <input id="img-url" v-model="form.imgURL" required class="form-control" />
                        </div>
                        <div class="modal-footer">
                          <button v-if="!editingProgram" @click="showModal()">Add</button>
                          <button @click="updateProgram(program)">Edit</button>
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                            @click="cancelForm">Cancel</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Spinner from '../components/Spinner.vue'
export default {
  name: 'Admin',
  components:{
    Spinner
  },
  computed: {
    programs() {
      return this.$store.state.programs;
    }, 
    loading() {
      return this.$store.state.loading;
    }
  },
  data() {
    return {
      showModal: false,
      editingProgram: false, // new property
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
  this.$store.commit('setLoading', true); //  True will show the spinner
  this.$store.dispatch('fetchPrograms').then(() => {
    this.$store.commit('setLoading', false); // False will hide the spinner after the programs are fetched
  });
},
  methods: {
    showAddModal() {
      this.modalTitle = "Add Program";
      this.modalAction = "Add"; // Set the modalAction property to "Add"
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
      this.editingProgram = true; // set editingProgram to true when editing
      this.showModal = true;
    },

    submitForm() {
      if (this.modalAction === "Add") {
        this.$store.dispatch("addProgram", this.form);
      } else if (this.modalAction === "Update") {
        this.$store.dispatch("updateProgram", this.form);
      }
      this.showModal = false;
      this.editingProgram = false; // set editingProgram back to false when closing modal
    },

    cancelForm() {
      this.showModal = false;
    },
    deleteProgram(program) {
      console.log(program); // Add this line
      console.log('Program: ', program.ID);
      if (confirm("Are you sure you want to delete this program?")) {
        if (program.ID) {
          this.$store.dispatch("deleteProgram", program.ID).then(() => {
            // handle success
            console.log("Program deleted successfully");
          }).catch(err => {
            // handle error
            console.error(err);
          });
        } else {
          console.error("Invalid program ID");
        }
      }
    },
    updateProgram(program) {
      console.log('Program: ', program.ID);
      if (program.ID) {
        this.$store.dispatch("updateProgram", program.ID).then(() => {
          // handle success
          console.log("Program updated successfully");
        })
          .catch(err => {
            // handle error
            console.error(err);
          });
      } else {
        console.error("Invalid program ID");
      }
    }
  }
}
</script>


<style scoped>
.body{
	margin:0;
	padding:20px;
  background: radial-gradient(circle, rgba(248, 248, 248, 1) 0%, rgb(193, 210, 232) 100%);
  font-family: 'Black Mango Medium';
}

*{
	box-sizing: border-box;
}
img {
  width: 250px;
}

h1 {
  margin-bottom: 30px;
    font-size: 4rem;
    padding-top: 30px;
    color: rgb(27, 61, 102);
    text-align: center;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
}

.table td, .table th {
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

@media(max-width: 946px){
	.table thead{
		display: none;
	}

	.table, .table tbody, .table .program, .table td{
		display: block;
		width: 100%;
	}
	.table .program{
		margin-bottom:15px;
	}
	.table td{
		text-align: right;
		/* padding-left: 50%; */
		text-align: right;
		position: relative;
    width: 100%;
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
}
  img {
  width: 300px;
  object-fit: contain;
}
}
</style>