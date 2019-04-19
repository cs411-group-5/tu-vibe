<template>
  <b-card>
    <h1>User listing</h1>
    <b-table striped hover :items="users"></b-table>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      users: []
    };
  },
  methods: {
    fetchUsers() {
      fetch("http://localhost:8889/user")
        .then(r => r.json())
        .then(r => {
            console.log(r);
          this.users = r;
        });
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style>
</style>
