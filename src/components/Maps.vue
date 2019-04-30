<template>
  <div>
    <h1>
      <small>Welcome to</small>
      {{ currentLocation }}
    </h1>
    <!--<p>{{yelpJSON}}</p>-->
    <!-- <button v-on:click="initMap()">lol</button> -->
    <div id="map" style="width: 100%; height: 400px"></div>
  </div>
</template>


<script>
import Yelp from "@/components/Yelp.vue";

export default {
  name: "Maps",
  data() {
    return {
      loc: undefined
    };
  },
  props: ["yelpJSON"],
  watch: {
    yelpJSON(value) {
      this.initMap();
    }
  },
  methods: {
    initMap() {
      // Map options
      var options = {
        zoom: 15,
        center: { lat: 42.3557, lng: -71.0572 }
      };

      // New map
      var map = new google.maps.Map(document.getElementById("map"), options);
      var infoWindow = new google.maps.InfoWindow();

      // Listen for click on map
      // google.maps.event.addListener(map, 'click', function(event){
      //   // Add marker
      //   addMarker({coords:event.latLng});
      // });

      // Array of markers
      var markers = [
        {
          coords: { lat: 42.4668, lng: -70.9495 },
          // iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
          content: "<h1>Lynn MA</h1>"
        },
        {
          coords: { lat: 42.8584, lng: -70.93 },
          content: "<h1>Amesbury MA</h1>"
        },
        {
          coords: { lat: 42.7762, lng: -71.0773 },
          content: "<h1>Haverhill MA</h1>"
        }
      ];

      // Loop through markers
      this.yelpJSON.businesses.map(b => {
        console.log(b);
        var long = b.coordinates.longitude;
        var lat = b.coordinates.latitude;
        var m = {
          coords: { lat: lat, lng: long },
          content: "<h1>{{ b.name }}</h1>"
        };
        // Add marker
        //console.log(m);
        addMarker(m);
      });

      // Add Marker Function
      function addMarker(props) {
        var marker = new google.maps.Marker({
          position: props.coords,
          map: map
          //icon:props.iconImage
        });

        // Check for customicon
        if (props.iconImage) {
          // Set icon image
          marker.setIcon(props.iconImage);
        }

        // Check content
        if (props.content) {
          var infoWindow = new google.maps.InfoWindow({
            content: props.content
          });

          marker.addListener("click", function() {
            infoWindow.open(map, marker);
          });
        }
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            this.loc = pos;
            infoWindow.setPosition(pos);
            infoWindow.setContent("You're here!");
            infoWindow.open(map);
            map.setCenter(pos);
          },
          function() {
            this.handleLocationError(true, infoWindow, map.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
        this.handleLocationError(false, infoWindow, map.getCenter());
      }
    },
    handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    }
  },
  mounted() {
    this.initMap();
  }
};

// marker.setMap(map);
</script>

<style scoped>
</style>