<template>

  <div class="discover">

    <!--<header class="py-5 bg-image-full">-->
      <!--<div class="header-img img-square-wrapper">-->
        <!--<img style="background-image" :src='yelpJSON.image_url'>-->
      <!--</div>-->
      <!--<img class="img-fluid d-block mx-auto" src="http://placehold.it/200x200&text=Logo" alt="">-->
    <!--</header>-->
    <title>Discover</title>

    <br><h1><small>Discover</small> {{ yelpJSON.name }}</h1>

    <div class="row">

      <div class="col-lg-6 mb-6">
        <div class="card card-outline-primary h-100">
          <img class="card-img-top" :src='yelpJSON.image_url'>
          <div class="card-body">
            <p style="color: #000 !important;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
          <ul class="list-group list-group-flush">
          </ul>
        </div>
      </div>

      <div class="col-lg-6 mb-6">
        <div class="card h-100">
          <h3 class="card-header"><small>Perfect for: </small>
            <span v-for="item in yelpJSON.categories">
              {{item.title}}
            </span>
          </h3>
          <!--<div class="card-body">-->
          <!--<div class="display-4">$19.99</div>-->
          <!--<div class="font-italic">per month</div>-->
          <!--</div>-->
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <p class="alignleft">Price</p>
              <p class="alignright">{{yelpJSON.price}}</p
            </li>
            <li class="list-group-item">
              <p class="alignleft">Rating</p>
              <p class="alignright">{{yelpJSON.rating}} ({{business.review_count}} reviews) </p
            </li>
            <li class="list-group-item">
              <p class="alignleft">Phone Number</p>
              <p class="alignright">{{yelpJSON.display_phone}}</p
            </li>
            <li class="list-group-item">
              <p class="alignleft">Distance</p>
              <p class="alignright">{{yelpJSON.distance}}</p
            </li>
            <li class="list-group-item">
              <p class="alignleft">Address</p>
              <p class="alignright"></p
            </li>
            <li class="list-group-item">
              <a>Check this out!</a>
            </li>
          </ul>
        </div>
      </div>

    </div>
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
  #header-img {
    width: 100%;
    height: auto;
  }
  .alignleft {
    float: left;
  }
  .alignright {
    float: right;
    color: #000 !important;
  }

</style>