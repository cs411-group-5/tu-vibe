<template>
  <b-container id="app" fluid>
    <b-row>
        <!--<router-link to="/">Home</router-link>|-->
        <!--<router-link to="/about">About</router-link>-->
        <!-- Sidebar Holder -->
      <div class="wrapper">
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
            <li>
              <a>Go to your Spotify</a>
            </li>
            <li v-if="userID">
              <a @click="logout()">Logout</a>
            </li>
          </ul>
        </nav>

      <div class="fluid container">
        <router-view/>
      </div>

      </div>
    </b-row>
  </b-container>
</template>



<script>
export default {
  data() {
    return {
      categorySM: true,
      homeSM: true,
      userID: undefined
    };
  },
  methods: {
    logout() {
      console.log("Logging out");
      this.$cookie.delete("userID");
    }
  },
  mounted() {
    // console.log("Getting userid ");
    this.userID = this.$cookie.get("userID");
  }
};
</script>
<style lang="scss">
#app {
  /*font-family: "Avenir", Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/


  /*
    DEMO STYLE
*/
  @import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";


  body {
    font-family: 'Poppins', sans-serif;
    background: #fafafa;
  }

  p {
    font-family: 'Poppins', sans-serif;
    font-size: 1.1em;
    font-weight: 300;
    line-height: 1.7em;
    color: #999;
  }

  a, a:hover, a:focus {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;
  }

  .navbar {
    padding: 15px 10px;
    background: #fff;
    border: none;
    border-radius: 0;
    margin-bottom: 40px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  }

  .navbar-btn {
    box-shadow: none;
    outline: none !important;
    border: none;
  }

  .btn {
    border: none;
  }

  .line {
    width: 100%;
    height: 1px;
    border-bottom: 1px dashed #ddd;
    margin: 40px 0;
  }

  /* ---------------------------------------------------
      SIDEBAR STYLE
  ----------------------------------------------------- */

  .wrapper {
    display: flex;
    width: 100%;
    align-items: stretch;
    perspective: 1500px;
  }


  #sidebar {
    min-width: 250px;
    max-width: 250px;
    background: #343F50;
    color: #f5ac40;
    transition: all 0.6s cubic-bezier(0.945, 0.020, 0.270, 0.665);
    transform-origin: bottom left;
  }

  #sidebar.active {
    margin-left: -250px;
    transform: rotateY(100deg);
  }

  #sidebar .sidebar-header {
    padding: 20px;
    background: #47566e;
    color: #f5ac40;
    font-size: 1.1em;
  }

  #sidebar ul.components {
    padding: 20px 0;
    border-bottom: 1px solid #47748b;
  }

  #sidebar ul p {
    color: #f5ac40;
    padding: 10px;
  }

  #sidebar ul li a {
    padding: 10px;
    font-size: 1.1em;
    display: block;
  }
  #sidebar ul li a:hover {
    color: #f5ac40;
    background: #47566e;
  }

  #sidebar ul li.active > a, a[aria-expanded="true"] {
    color: #f5ac40;
    background: #343F50;
  }


  a[data-toggle="collapse"] {
    position: relative;
  }

  .dropdown-toggle::after {
    display: block;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }

  ul ul a {
    font-size: 0.9em !important;
    padding-left: 30px !important;
    background: #343F50;
  }

  ul.CTAs {
    padding: 20px;
  }

  ul.CTAs a {
    text-align: center;
    font-size: 0.9em !important;
    display: block;
    border-radius: 5px;
    margin-bottom: 5px;
  }

  a.download {
    background: #fff;
    color: #343F50;
  }





  /* ---------------------------------------------------
      CONTENT STYLE
  ----------------------------------------------------- */
  #content {
    width: 100%;
    padding: 20px;
    min-height: 100vh;
    transition: all 0.3s;
  }

  #sidebarCollapse {
    width: 40px;
    height: 40px;
    background: #f5f5f5;
    cursor: pointer;
  }

  #sidebarCollapse span {
    width: 80%;
    height: 2px;
    margin: 0 auto;
    display: block;
    background: #555;
    transition: all 0.8s cubic-bezier(0.810, -0.330, 0.345, 1.375);
    transition-delay: 0.2s;
  }

  #sidebarCollapse span:first-of-type {
    transform: rotate(45deg) translate(2px, 2px);
  }
  #sidebarCollapse span:nth-of-type(2) {
    opacity: 0;
  }
  #sidebarCollapse span:last-of-type {
    transform: rotate(-45deg) translate(1px, -1px);
  }


  #sidebarCollapse.active span {
    transform: none;
    opacity: 1;
    margin: 5px auto;
  }


  /* ---------------------------------------------------
      MEDIAQUERIES
  ----------------------------------------------------- */
  @media (max-width: 768px) {
    #sidebar {
      margin-left: -250px;
      transform: rotateY(90deg);
    }
    #sidebar.active {
      margin-left: 0;
      transform: none;
    }
    #sidebarCollapse span:first-of-type,
    #sidebarCollapse span:nth-of-type(2),
    #sidebarCollapse span:last-of-type {
      transform: none;
      opacity: 1;
      margin: 5px auto;
    }
    #sidebarCollapse.active span {
      margin: 0 auto;
    }
    #sidebarCollapse.active span:first-of-type {
      transform: rotate(45deg) translate(2px, 2px);
    }
    #sidebarCollapse.active span:nth-of-type(2) {
      opacity: 0;
    }
    #sidebarCollapse.active span:last-of-type {
      transform: rotate(-45deg) translate(1px, -1px);
    }

  }

  .active-pink-2 input[type=text]:focus:not([readonly]) {
    border-bottom: 1px solid #f48fb1;
    box-shadow: 0 1px 0 0 #f48fb1;
  }

}
</style>
