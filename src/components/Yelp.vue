<template>
  <b-col>
    <input
      class="form-control"
      type="text"
      placeholder="Search for awesomeness..."
      aria-label="Search"
      v-model="term"
      id="search-bar"
    >
    <!--<b-button v-on:click="getYelp();">Click here!</b-button>-->
    <ul class="result-list" v-if="yelpJSON">
      <div
        id="results"
        class="container-fluid"
        style="width: 100%; height: 200px;"
        v-for="business in yelpJSON.businesses"
        :key="business.id"
      >
        <div class="row">
          <div class="col-12 mt-3">
            <router-link :to="business.id | generateRoute">
              <div class="card">
                <div class="card-horizontal">
                  <div class="img-square-wrapper">
                    <img style="width: 300px; height: 180" :src="business.image_url">
                  </div>
                  <div class="card-body">
                    <h3 class="card-title">{{business.name}}</h3>
                    <span v-for="(item, itemIx) in business.categories" :key="itemIx">{{item.title}}</span>
                    <p>Rating: {{business.rating}} ({{business.review_count}} reviews)</p>
                    <p>Price: {{business.price}}</p>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </ul>
  </b-col>
</template>

<script>
export default {
  data() {
    return { term: "" };
  },
  props: ["yelpJSON", "getYelp"],
  watch: {
    term(value) {
      console.log(value);
      this.getYelp(value);
    }
  },
  filters: {
    generateRoute(v) {
      return { name: "discover", query: { id: v } };
    }
  }
};
</script>

<style>
.result-list {
  margin: 0 auto;
  padding: 0;
}
#search-bar {
  width: 100%;
  /* margin: 1em 1em; */
  /* padding-left: 1em; */
  /* padding-right: 1em; */
}

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