<template>
  <p>TODO Make some nice welcome page for when not logged in.</p>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {
  },
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>
