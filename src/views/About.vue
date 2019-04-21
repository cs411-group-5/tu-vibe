<template>
  <div class="about">
    <h1>Discover places around</h1>
    <Yelp />
  </div>
</template>

<script>
  // @ is an alias to /src

  import Yelp from "@/components/Yelp.vue"
  export default {
    name: 'about',
    components: {
      Yelp
    }
  }
</script>


