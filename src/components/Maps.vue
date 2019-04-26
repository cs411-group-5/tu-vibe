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
      currentLocation: undefined,
      gMap: undefined,
      gMapOptions: {
        zoom: 15,
        center: { lat: 42.3557, lng: -71.0572 }
      },
      gInfoWindow: undefined,
      gMarkers: [],
      gGeocoder: undefined
    };
  },
  props: ["yelpJSON"],
  watch: {
    yelpJSON(value) {
      this.updateMap();
    }
  },
  methods: {
    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            let pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            console.log(`Pos: `, pos);
            this.gGeocoder.geocode(
              {
                location: pos
              },
              results => {
                // console.log(results);
                let niceResults = results.filter(
                  v => v["types"].indexOf("locality") >= 0
                );
                if (niceResults.length > 0) {
                  this.currentLocation = niceResults[0].formatted_address;
                }
              }
            );

            // this.currentLocation = pos;
            // this.gInfoWindow.setPosition(pos);
            // this.gInfoWindow.setContent("You're here!");
            // this.gInfoWindow.open(map);
            // this.gMap.setCenter(pos);
          },
          () => {
            this.handleLocationError(
              true,
              this.gInfoWindow,
              this.gMap.getCenter()
            );
          }
        );
      } else {
        // Browser doesn't support Geolocation
        this.handleLocationError(
          false,
          this.gInfoWindow,
          this.gMap.getCenter()
        );
      }
    },
    initMap() {
      // New map
      this.gMap = new google.maps.Map(
        document.getElementById("map"),
        this.gMapOptions
      );
      this.gInfoWindow = new google.maps.InfoWindow();
      this.gGeocoder = new google.maps.Geocoder();

      this.getCurrentLocation();
    },

    updateMap() {
      // Empty the previous markers
      this.gMarkers = [];

      // Loop through locations
      this.yelpJSON.businesses.slice(0, 20).map(b => {
        // console.log(b);
        var long = b.coordinates.longitude;
        var lat = b.coordinates.latitude;
        var m = {
          coords: { lat: lat, lng: long },
          content: `<b>${b.name}</b>`
        };
        // Add marker
        //console.log(m);
        this.addMarker(m);
      });

      let bounds = new google.maps.LatLngBounds();
      for (let i = 0; i < this.gMarkers.length; i++) {
        bounds.extend(this.gMarkers[i].getPosition());
      }
      //center the map to the geometric center of all markers
      this.gMap.setCenter(bounds.getCenter());

      this.gMap.fitBounds(bounds);

      //remove one zoom level to ensure no marker is on the edge.
      this.gMap.setZoom(this.gMap.getZoom() - 1);
    },
    handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    },
    addMarker(props) {
      var marker = new google.maps.Marker({
        position: props.coords,
        map: this.gMap
        //icon:props.iconImage
      });

      //   // Check for customicon
      //   if (props.iconImage) {
      //     // Set icon image
      //     marker.setIcon(props.iconImage);
      //   }

      // Check content
      if (props.content) {
        this.gInfoWindow = new google.maps.InfoWindow({
          content: props.content
        });

        marker.addListener("click", () => {
          this.gInfoWindow.open(this.gMap, marker);
        });
      }

      // Add the marker into the global list of markers
      this.gMarkers.push(marker);
    }
  },
  mounted() {
    this.initMap();
  }
};
</script>
