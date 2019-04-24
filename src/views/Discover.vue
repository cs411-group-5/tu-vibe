<template>
  <div class="discover">
    <title>Discover</title>

    <h1>Discover {{ yelpJSON.name }}</h1>
    

    <!-- this location  -->
    <Maps/>
  </div>

</template>

<script>
export default {
  name: "discover",
  data() {
    return { yelpJSON: undefined, id : undefined};
  },
  methods: {
    getYelp() {
      fetch(`http://localhost:8889/yelp/info/?id=${this.id}`)
        .then(r => r.json())
        .then(j => {
          this.yelpJSON = j;
        });
    }
  },
  watch: {
    id(value){
      this.getYelp();
    }
  },
  mounted() {
    if (this.$route.params.id){
      this.id = this.$route.params.id;
    }

  }
};
</script>

<style scoped>

</style>