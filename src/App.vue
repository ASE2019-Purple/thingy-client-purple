<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      v-if="$auth.isAuthenticated"
      app
    >
      <nav-bar />
    </v-navigation-drawer>

    <v-app-bar
      app
      dark
    >
      <v-app-bar-nav-icon
        v-if="$auth.isAuthenticated"
        @click.stop="drawer = !drawer"
      />

      <v-toolbar-title>ASE2019 Purple</v-toolbar-title>

      <div class="flex-grow-1" />

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <login-component />
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
    <v-footer app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import LoginComponent from "@/components/LoginComponent.vue";


export default {
  components: {
    NavBar, LoginComponent
  },
  data: () => ({
    drawer: null,
    right: null
  }),
  created () {
    this.$vuetify.theme.dark = true
  }
};
</script>
