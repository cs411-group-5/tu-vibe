<template>
  <div>
    <b-card>
      <h1>Facebook data</h1>
      <div>
        <fb:login-button scope="public_profile,email" onlogin="checkLoginState();"></fb:login-button>
        <b-button v-on:click="fbLogout">Logout</b-button>
      </div>
      <p>{{fbAuthResp}}</p>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fbAuthResp: {}
    };
  },
  methods: {
    statusChangeCallback(r) {
      if (r.status === "connected") {
        this.fbAuthResp = r.authResponse;
      } else {
        this.fbAuthResp = { error: r.status };
      }
    },
    fbLogout() {
      console.log("Logging out");
      window.FB.logout(r => {
        console.log(r);
      });
    },
    checkLoginState() {
      window.FB.getLoginStatus(response => {
        this.statusChangeCallback(response);
      });
    }
  },
  mounted() {
    window.checkLoginState = this.checkLoginState;
    this.checkLoginState();
  }
};
</script>

<style>
</style>
