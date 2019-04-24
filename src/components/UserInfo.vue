<template>
  <div>
    <b-card :title="userInfo.display_name">
      <b-row>
        <b-col cols="2">
          <b-img class="user-avatar" thumbnail fluid :src="userAvatar"></b-img>
        </b-col>
        <b-col>
          <ul class="user-data">
            <li>
              <span>
                <b>Email:&nbsp;</b>
                <code>{{userInfo.email}}</code>
              </span>
            </li>
            <li>
              <span>
                <b>Spotify URL:&nbsp;</b>
                <code>
                  <a :href="userInfo.external_urls.spotify">{{userInfo.external_urls.spotify}}</a>
                </code>
              </span>
            </li>

            <li>
              <span>
                <b>Recommendation:&nbsp;</b>
                <code>
                  {{userInfo.yelpTerm?userInfo.yelpTerm : ""}}
                  <a
                    v-if="!userInfo.yelpTerm"
                    href="#"
                    @click="getRecs"
                  >Click here to get recommendation!</a>
                </code>
              </span>
            </li>
          </ul>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "user-info",
  data() {
    return {
      userInfo: undefined
    };
  },
  props: ["userID"],
  computed: {
    userAvatar() {
      if (this.userInfo.images.length > 0) {
        return this.userInfo.images[0].url;
      } else {
        return "img/default_avatar.jpg";
      }
    }
  },
  methods: {
    fetchUser() {
      console.log(`Fetching user ${this.userID}`);

      if (this.userID) {
        fetch(`http://localhost:8889/user/info/${this.userID}`)
          .then(r => r.json())
          .then(r => {
            console.log(r);
            this.userInfo = r[0];
          });
      }
    },
    getRecs() {
      fetch(
        `http://localhost:8889/decision/?token=${this.userInfo.accessToken}`
      )
        .then(r => r.json())
        .then(r => {
          console.log(r);
          window.location = "/user";
        });
    }
  },
  watch: {
    userID(value) {
      this.fetchUser();
    }
  }
};
</script>

<style lang="scss" scoped>
.user-data {
  padding: 0;
  margin: 0 auto;
  li {
    list-style: none;
  }
}
</style>
