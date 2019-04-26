<template>
  <div class="home">
    <title>Home Page</title>

    <!-- <Login /> -->
    <!-- <h1>Welcome to</h1> -->
    <!-- this location  -->
    <Maps :yelpJSON="yelpJSON"/>
    <br>
    <Yelp :yelpJSON="yelpJSON" :getYelp="getYelp" :term="term"/>
  </div>
</template>


<script>
// @ is an alias to /src

import Yelp from "@/components/Yelp.vue";
import Maps from "@/components/Maps.vue";

export default {
  name: "home",
  components: {
    Yelp,
    Maps
  },
  props: ["userInfo"],
  data() {
    return { yelpJSON: undefined, term: "" };
  },
  watch: {
    userInfo(v) {
      if (v && v.yelpTerm) {
        this.term = v.yelpTerm;
      }
    }
  },
  methods: {
    getYelp(term) {
      if (this.userInfo && this.userInfo.yelpTerm) {
        this.term = this.userInfo.yelpTerm;
      }
      fetch(`http://localhost:8889/yelp?text=${this.term}`)
        .then(r => r.json())
        .then(j => {
          this.yelpJSON = j;
        });
    }
  },

  mounted() {
    this.getYelp(this.term);
  }
};
</script>
