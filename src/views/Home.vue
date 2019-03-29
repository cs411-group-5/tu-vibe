<template>
  <div class="home">
    
    <Login />
    <input class="form-control ml-3 w-75" type="text" placeholder="Search for awesomeness..." aria-label="Search">
    <p>dfbjin</p>
  </div>
</template>



<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
  name: 'home',
  components: {
    Login
  }
}
</script>
