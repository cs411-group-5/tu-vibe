<template>
  <div>
    <user-info :userID="userID"/>
  </div>
</template>

<script>
import UserInfo from "@/components/UserInfo.vue";

export default {
  data() {
    return {
      userID: null
    };
  },
  components: {
    UserInfo
  },
  mounted() {
    // let userID = this.$route.query.code;

    if (this.$route.query.id) {
      let userID = this.$route.query.id;
      if (userID) {
        console.log(`Got Spotify AC ${userID}`);

        // Set cookie
        this.$cookie.set("userID", userID);
        this.userID = this.$cookie.get("userID");

        // console.log(document.cookie);
      }
    } else {
      this.userID = this.$cookie.get("userID");
    }

    this.$emit("updateUserID", this.userID);
  }
};
</script>

<style>
</style>
