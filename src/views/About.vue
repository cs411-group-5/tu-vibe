<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ul>
      <li v-for="business in yelpJSON.businesses">
        {{business.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {yelpJSON: undefined};
  },
  methods: {
    getYelp () {
      fetch("https://cs411-group-5.github.io/web/example.json").then((r) => r.json()).then((j) => {
        this.yelpJSON = j;
      });
    }
  },
  mounted() {
    this.getYelp();
  },
}
</script>
