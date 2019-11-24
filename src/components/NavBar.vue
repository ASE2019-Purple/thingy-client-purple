<template>
  <v-list dense>
    <v-list-item to="/">
      <v-list-item-icon>
        <v-icon>mdi-view-dashboard</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item to="/profile">
      <v-list-item-icon>
        <v-icon>mdi-settings</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Profile</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item to="/charts">
      <v-list-item-content>
        <v-list-item-title>Chart</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "NavBar",
  data: () => ({
    drawer: null,
    right: null
  }),
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
