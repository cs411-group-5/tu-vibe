<template>
  <div>
    <!-- <user-listing /> -->
    <!-- <p>{{$route.query}}</p> -->
    <p>{{userInfo}}</p>
  </div>
</template>

<script>
// import UserListing from "@/components/UserListing.vue";

export default {
  data() {
    return {
      userID: null,
      userInfo: null
    };
  },
  // components: {
  //     UserListing
  // },
  methods: {
    fetchUser() {
      console.log(`Fetching user ${this.userID}`);

      if (this.userID) {
        fetch(`http://localhost:8889/user/${this.userID}`)
          .then(r => r.json())
          .then(r => {
            console.log(r);
            this.userInfo = r[0];
          });
      }
    }
  },
  watch: {
    userID(value) {
      this.fetchUser();
    }
  },
  mounted() {
    // let accessCode = this.$route.query.code;

    if (this.$route.query.code) {
      let accessCode = this.$route.query.code;
      if (accessCode) {
        console.log(`Got Spotify AC ${accessCode}`);

        // Set cookie
        this.$cookie.set("userID", accessCode);
        this.userID = this.$cookie.get("userID");

        // console.log(document.cookie);
      }
    } else {
      this.userID = this.$cookie.get("userID");
      this.fetchUser();
    }
  }
};
</script>

<style>
</style>
