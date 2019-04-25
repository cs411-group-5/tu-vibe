<template>
  <div class="about">
    <h1>Discover places around</h1>
    <Yelp :yelpJSON="yelpJSON" :getYelp="getYelp"/>
  </div>
</template>

<script>
  // @ is an alias to /src

  import Yelp from "@/components/Yelp.vue"
  export default {
    name: 'about',
    components: {
      Yelp
    },
    data() {
      return {yelpJSON: undefined};
    },
    methods: {
      getYelp(term) {
        fetch(`http://localhost:8889/yelp?text=${term}`).then((r) => r.json()).then((j) => {
          this.yelpJSON = j;
        });
      }
    },

    mounted() {
      this.getYelp("");
    }
  }
</script>


