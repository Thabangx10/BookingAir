<template>
    <div>
        <AdminVue></AdminVue>
    </div>
    <div>
      <UserCrud></UserCrud>
    </div>
    <div>
      <FlightsCrud></FlightsCrud>
    </div>
</template>

<script>
import AdminVue from '../components/Admin.vue'
import UserCrud from '../views/UserCrudView.vue'
import FlightsCrud from '../views/FlightsCrudView.vue'


export default {
  components:{
    AdminVue,
    UserCrud,
    FlightsCrud
  }
}
</script>

<style scoped>
    
</style>