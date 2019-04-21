<template>
  <div>
    <input
      class="form-control ml-3 w-75"
      type="text"
      placeholder="Search for awesomeness..."
      aria-label="Search"
      v-model="term"
    >
    <!--<b-button v-on:click="getYelp();">Click here!</b-button>-->
    <ul>
      <li v-for="business in yelpJSON.businesses" :key="business.id">
        <div id="results" class="container-fluid" style="width: 100%; height: 200px;">
          <div class="row">
            <div class="col-12 mt-3">
              <router-link to="/discover">
                <div class="card">
                  <div class="card-horizontal">
                    <div class="img-square-wrapper">
                      <img style="width: 300px; height: 180" :src="business.image_url">
                    </div>
                    <div class="card-body">
                      <h3 class="card-title">{{business.name}}</h3>
                      <span v-for="item in business.categories" :key="item.id">{{item.title}}</span>
                      <p>Rating: {{business.rating}} ({{business.review_count}} reviews)</p>
                      <p>Price: {{business.price}}</p>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return { yelpJSON: undefined, term: "" };
  },
  methods: {
    getYelp() {
      fetch(`http://localhost:8889/yelp?text=${this.term}`)
        .then(r => r.json())
        .then(j => {
          this.yelpJSON = j;
        });
    }
  },
  watch: {
    term(value) {
      console.log(value);
      this.getYelp();
    }
  },
  mounted() {
    this.getYelp();
  }
};
</script>

<style>
.card-horizontal p {
  color: darkgray;
  font-size: 1.1em !important;
  display: block;
}

.card-horizontal span {
  font-size: 1.1em !important;
}

.card-horizontal {
  display: flex;
  flex: 1 1 auto;
  color: #47566e;
}
</style>