<template>
    <div>
        <b-card>
            <h1>Yelp!</h1>
            <ul>
                <li v-for="business in yelpJSON.businesses">
                    {{business.name}}
                </li>
            </ul>
        </b-card>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
