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
    
    <v-list-item to="/about">
        <v-list-item-icon>
        <v-icon>mdi-vuetify</v-icon>
        </v-list-item-icon>
         <v-list-item-content>
        <v-list-item-title>Vuetify</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    
    <v-list-item v-if="$auth.isAuthenticated" to="/profile">
        <v-list-item-icon>
        <v-icon>mdi-settings</v-icon>
        </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Profile</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    
  </v-list>
  
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    right: null,
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
}
</script>
