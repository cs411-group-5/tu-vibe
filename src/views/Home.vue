<template>
  <div class="home">
    
    <!-- <Login /> -->
    
    <Yelp />
  </div>
</template>



<script>
// @ is an alias to /src

import Yelp from "@/components/Yelp.vue"
export default {
  name: 'home',
  components: {
    Yelp
  }
}
</script>
