<template>
    <div class="discover">
        <title>Discover</title>
        {{$route.params.id}}
        <h1>Discover</h1>
        <!-- <Login /> -->

    </div>
</template>

<script>

    export default {
        name: 'discover',
        mounted() {
            console.log(this.$route);
        }
    }
</script>

<style scoped>

</style>