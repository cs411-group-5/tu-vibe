<template>
  <nav id="sidebar">
    <div class="sidebar-header">
      <h3>
        <router-link to="/">TuVibe</router-link>
      </h3>
    </div>

    <ul class="list-unstyled components">
      <li class="active">
        <a
          href="#"
          data-toggle="collapse"
          aria-expanded="false"
          class="dropdown-toggle"
          v-on:click="homeSM = !homeSM"
        >Home</a>
        <ul :class="`${homeSM?'collapse':''} list-unstyled`" id="homeSubmenu">
          <li>
            <router-link to="/">Your Vibe</router-link>
          </li>
          <li>
            <router-link to="/">Music Events</router-link>
          </li>
          <li>
            <router-link to="/">Popular</router-link>
          </li>
        </ul>
      </li>
      <li>
        <router-link to="/about">Search</router-link>
        <a
          href="#"
          data-toggle="collapse"
          aria-expanded="false"
          class="dropdown-toggle"
          v-on:click="categorySM = !categorySM"
        >Categories</a>
        <ul :class="`${categorySM?'collapse':''} list-unstyled`" id="pageSubmenu">
          <li>
            <router-link to="/categories">Cafes</router-link>
          </li>
          <li>
            <router-link to="/categories">Bars</router-link>
          </li>
          <li>
            <router-link to="/categories">Concerts</router-link>
          </li>
        </ul>
      </li>
      <li>
        <router-link to="/user">Your Account</router-link>
      </li>
      <li>
        <router-link to="/contact">Contact us</router-link>
      </li>
    </ul>

    <ul class="list-unstyled CTAs">
      <li v-if="!userID">
        <a @click="redirectLogin()">Login through Spotify</a>
      </li>
      <li v-if="userID">
        <a @click="logout()">Logout</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      categorySM: true,
      homeSM: true
    };
  },
  props: ["userID"],
  methods: {
    logout() {
      console.log("Logging out");
      this.$cookie.delete("userID");
      window.location = "/";
    },
    redirectLogin() {
      window.location = "http://localhost:8889/spotify/spotify";
    }
  },
  mounted() {
    console.log("Getting userid ");
    this.userID = this.$cookie.get("userID");
  }
};
</script>

<style>
</style>
