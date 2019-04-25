<template>
    <div>
        <input class="form-control ml-3 w-75" type="text"
               placeholder="Search for awesomeness..." aria-label="Search"
               v-model="term">
        <!--<b-button v-on:click="getYelp();">Click here!</b-button>-->
        <ul>

            <div id="results" class="container-fluid" style="width: 100%; height: 200px;"
                 v-for="business in yelpJSON.businesses">

                <div class="row">
                    <div class="col-12 mt-3">
                        <!--<router-link to="/discover">-->
                        <router-link :to='{name: "discover", params: { id: business.id}}'>
                            <div class="card">
                                <div class="card-horizontal">
                                    <div class="img-square-wrapper">
                                        <img style="width: 300px; height: 180" :src='business.image_url'>
                                    </div>
                                    <div class="card-body">
                                        <h3 class="card-title">{{business.name}}</h3>
                                        <span v-for="item in business.categories">
                                                {{item.title}}
                                            </span>
                                        <p>Rating: {{business.rating}} ({{business.review_count}} reviews) </p>
                                        <p>Price: {{business.price}}</p>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>

            </div>

        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {term: ""};
        },
        props: ["yelpJSON", "getYelp"],
        watch: {
            term(value) {
                console.log(value);
                this.getYelp(value);
            }
        },

    }
</script>

<style>
    .card-horizontal p {
        color: darkgray;
        font-size: 1.1em !important;
        display: block;
    }


    .card-horizontal span {
        font-size: 1.1em !important;

    }

    .card-horizontal {
        display: flex;
        flex: 1 1 auto;
        color: #47566e;
    }
</style>