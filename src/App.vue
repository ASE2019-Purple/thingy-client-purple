<template>
  <v-app id="inspire">

    <v-navigation-drawer
      v-model="drawer"
      app
    >

      <nav-bar/>

      
    </v-navigation-drawer>

      <v-app-bar
        app
        color="indigo"
        dark
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Application</v-toolbar-title>

        <div class="flex-grow-1"></div>


        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

       
        <template v-if="!$auth.loading">
            
          <v-btn outlined v-if="!$auth.isAuthenticated" @click="login">
            <v-icon>mdi-login</v-icon>
              Login
            
          </v-btn>


          <template v-if="$auth.isAuthenticated">
            
            <v-avatar size=36 class="pa-8">
              <img
                :src="$auth.user.picture"
                :alt="$auth.user.name"
              >
            </v-avatar>
        
      
           <v-menu
          left
          bottom
        >
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="logout">
               <v-list-item-icon>
        <v-icon>mdi-logout</v-icon>
      </v-list-item-icon>
      
      <v-list-item-content>
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item-content>
      
               </v-list-item>
               
            <v-list-item
              v-for="n in 5"
              :key="n"
              @click="() => {}"
            >
              <v-list-item-title>Option {{ n }}</v-list-item-title>
            </v-list-item>
          </v-list>
           </v-menu>
           
        </template>

          </template>


      </v-app-bar>



      <v-content>
        <router-view/>

      </v-content>
      <v-footer
        color="indigo"
        app
      >
        <span class="white--text">&copy; 2019</span>
      </v-footer>
  </v-app>
</template>



<script>
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    NavBar
  },
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
};
</script>
