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

      <DateRangeComponent v-model="dateRange"/>

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
import DateRangeComponent from "@/components/DateRangeComponent.vue";


export default {
  components: {
    NavBar, LoginComponent,
    DateRangeComponent : DateRangeComponent
  },
  data: () => ({
    drawer: null,
    right: null,
    dateRange: ['2019-09-10', '2019-09-20']
  }),
  created () {
    this.$vuetify.theme.dark = true

    // Init dateRange 
    var today = new Date();
    this.dateRange = [today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(), today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+1)];
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  }
};
</script>
