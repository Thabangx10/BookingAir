<template>
  <div class="body">
    <h1>Users</h1>
    <div v-if="loading">
      <Spinner />
    </div>
    <div v-else>
      <table class="table m-auto">
        <colgroup>
          <col span="3">
          <col class="hide" span="1">
        </colgroup>
        <thead>
          <tr class="program">
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>UserPassword</th>
            <th>Address</th>
            <th>PhoneNumber</th>
            <th>userRole</th>

            <th><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                @click="showAddModal">Add User</button></th>
          </tr>
        </thead>
        <tbody>
          <tr class="program" v-for="user in users" :key="user.id">
            <td data-label="FirstName">{{ user.FirstName }}</td>
            <td data-label="LastName">{{ user.LastName }}</td>
            <td data-label="Email">{{ user.Email }}</td>
            <td data-label="UserPassword">{{ user.UserPassword }}</td>
            <td data-label="Address">{{ user.Address }}</td>
            <td data-label="PhoneNumber">{{ user.PhoneNumber }}</td>
            <td data-label="userRole">{{ user.userRole }}</td>
            <td>
              <button @click="showEditModal(user)">Edit</button>
              <button @click="deleteUser(user)">Delete</button>
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
                          <label for="FirstName" class="form-label">FirstName:</label>
                          <input id="FirstName" v-model="form.FirstName" required class="form-control" />
                        </div>
                        <div class="mb-3">
                          <label for="LastName" class="form-label">LastName:</label>
                          <input id="LastName" v-model="form.LastName" required class="form-control" />
                        </div>
                        <div class="mb-3">
                          <label for="Email" class="form-label">Email:</label>
                          <input id="Email" v-model="form.Email" required class="form-control" />
                        </div>
                        <div class="mb-3">
                          <label for="UserPassword" class="form-label">UserPassword:</label>
                          <textarea id="UserPassword" v-model="form.UserPassword" required
                            class="form-control"></textarea>
                        </div>
                        <div class="mb-3">
                          <label for="Address" class="form-label">Address:</label>
                          <textarea id="Address" v-model="form.Address" required class="form-control"></textarea>
                        </div>
                        <div class="mb-3">
                          <label for="PhoneNumber" class="form-label">PhoneNumber:</label>
                          <textarea id="PhoneNumber" v-model="form.PhoneNumber" required class="form-control"></textarea>
                        </div>
                        <div class="mb-3">
                          <label for="userRole" class="form-label">userRole:</label>
                          <textarea id="userRole" v-model="form.userRole" required class="form-control"></textarea>
                        </div>

                        <div class="modal-footer">
                          <button v-if="!editingUser" @click="showModal()">Add</button>
                          <button @click="updateUser(user)">Edit</button>
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
  name: 'UserCrudView',
  components: {
    Spinner
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
    loading() {
      return this.$store.state.loading;
    }
  },
  data() {
    return {
      showModal: false,
      editingUser: false,
      modalTitle: "",
      modalAction: "",
      form: {
        FirstName: "",
        LastName: "",
        Email: "",
        UserPassword: "",
        Address: "",
        PhoneNumber: "",
        userRole: "",
      },
    };
  },
  created() {
    this.$store.commit('setLoading', true); //  True will show the spinner
    this.$store.dispatch('retrieveUsers').then(() => {
      this.$store.commit('setLoading', false); // False will hide the spinner after the programs are fetched
    });
  },
  methods: {
    showAddModal() {
      this.modalTitle = "Add User";
      this.modalAction = "Add";
      this.form = {
        FirstName: "",
        LastName: "",
        Email: "",
        UserPassword: "",
        Address: "",
        PhoneNumber: "",
        userRole: "",
      };
      this.showModal = true;
    },

    showEditModal(user) {
      this.modalTitle = "Edit User";
      this.modalAction = "Update";
      this.form = { ...user };
      this.editingUser = true;
      this.showModal = true;
    },

    submitForm() {
      if (this.modalAction === "Add") {
        this.$store.dispatch("register", this.form);
      } else if (this.modalAction === "Update") {
        this.$store.dispatch("updateUser", this.form);
      }
      this.showModal = false;
      this.editingUser = false;
    },

    cancelForm() {
      this.showModal = false;
    },
    deleteUser(user) {
      console.log(user); // Add this line
      if (confirm("Are you sure you want to delete this program?")) {
        if (user.ID) {
          console.log('User: ', user.ID);
          this.$store.dispatch("deleteUser", user.ID).then(() => {
            // handle success
            console.log("Program deleted successfully");
            // window.location.reload();
          }).catch(err => {
            // handle error
            console.error(err);
          });
        } else {
          console.error("Invalid program ID");
        }
      }
    },
    updateUser(user) {
      console.log('User: ', user.ID);
      if (user.ID) {
        this.$store.dispatch("updateUser", user.ID).then(() => {
          console.log("User updated successfully");
        })
          .catch(err => {
            console.error(err);
          });
      } else {
        console.error("Invalid user ID");
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
.hide {
  visibility: collapse;
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
  margin: 0;
  letter-spacing: 0.1rem;
  color: black;
}

.table th {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  letter-spacing: 0.1rem;
  color: black;
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
  width: 50px;
}
}
</style>