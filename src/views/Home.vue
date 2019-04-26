<template>
    <div class="home">
        <title>Home Page</title>

        <!-- <Login /> -->
        <h1>Welcome to</h1>  <!-- this location  -->
        <Maps :yelpJSON="yelpJSON"/>
        <br>
        <Yelp :yelpJSON="yelpJSON" :getYelp="getYelp"/>

    </div>
</template>


<script>
    // @ is an alias to /src

    import Yelp from "@/components/Yelp.vue"
    import Maps from "@/components/Maps.vue"

    export default {
        name: 'home',
        components: {
            Yelp,
            Maps
        },
        data() {
            return {yelpJSON: undefined};
        },
        methods: {
            getYelp(term) {
                fetch(`http://localhost:8889/yelp?text=${term}`).then((r) => r.json()).then((j) => {
                    this.yelpJSON = j;
                });
            }
        },

        mounted() {
            this.getYelp("");
        }
    }
</script>
