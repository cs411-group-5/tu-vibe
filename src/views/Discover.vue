<template>
  <div class="discover">
    <title>Discover</title>

    <!-- <Login /> -->
    <h1>Discover this place</h1>
    <button @click="getYelp()">Yelp!!</button>
    <!-- this location  -->
    <Maps/>
  </div>
</template>

<script>
export default {
  name: "discover",
  data() {
    return { yelpJSON: undefined };
  },
  methods: {
    getYelp() {
      fetch(`http://localhost:8889/yelp/info/id=${this.id}`)
        .then(r => r.json())
        .then(j => {
          this.yelpJSON = j;
        });
    }
  },
  mounted() {
    this.getYelp();
  }
};
</script>

<style scoped>
</style>