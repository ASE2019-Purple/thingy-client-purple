<template>
  <v-list dense>
    <v-list-item to="/">
      <v-list-item-icon>
        <v-icon>mdi-view-dashboard</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Monitor</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item to="/workflow">
      <v-list-item-icon>
        <v-icon>mdi-calendar-clock</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Workflow</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    
    <v-list-item to="/settings">
      <v-list-item-icon>
        <v-icon>mdi-settings</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Settings</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "NavBarComponent",
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
