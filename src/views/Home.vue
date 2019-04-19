<template>
  <div class="home">
    <title>Home Page</title>
    
    <!-- <Login /> -->
    <h1>Welcome to</h1>  <!-- this location  -->
    <Maps />
    <Yelp />

  </div>
</template>



<script>
// @ is an alias to /src

import Yelp from "@/components/Yelp.vue"
import Maps from "@/components/Maps.vue"
export default {
  name: 'home',
  components: {
    Yelp,
    Maps
  }
}
</script>
