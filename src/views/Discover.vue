<template>
  <div class="discover">
    <b-card>
      <title>Discover</title>

      <h1>Discover {{ yelpJSON.name }}</h1>
    </b-card>
  </div>
</template>

<script>
import Maps from "@/components/Maps.vue";

export default {
  name: "discover",
  components: { Maps },
  data() {
    return { yelpJSON: undefined, id: undefined };
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
    id() {
      this.getYelp();
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
    }
  }
};
</script>

<style scoped>
</style>