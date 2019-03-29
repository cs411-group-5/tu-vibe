<template>
    <div>
        <b-card>
            <input class="form-control ml-3 w-75" type="text" placeholder="Search for awesomeness..." aria-label="Search" v-model="term" > <b-button v-on:click="getYelp();">Click here!</b-button>
            <h1>Yelp!</h1>
            <ul>
                <li v-for="business in yelpJSON.businesses">
                    {{business.name}}
                </li>
            </ul>
        </b-card>
    </div>
</template>

<script>
export default {
  data () {
    return {yelpJSON: undefined, term: "cafe"};
  },
  methods: {
    getYelp () {
      fetch(`http://localhost:3000/yelp?text=${this.term}`).then((r) => r.json()).then((j) => {
        this.yelpJSON = j;
      });
    }
  },
  mounted() {
    this.getYelp();
  },
}
</script>

<style>

</style>
