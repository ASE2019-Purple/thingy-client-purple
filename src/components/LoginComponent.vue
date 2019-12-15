<template>
  <div>
    <template v-if="!$auth.loading">
      <v-btn
        outlined
        v-if="!$auth.isAuthenticated"
        @click="login"
      >
        <v-icon>mdi-login</v-icon>
        Login
      </v-btn>

      <template v-else>
        <v-menu
          left
          bottom
        >
          <template v-slot:activator="{ on }">
            <v-btn
              class="mx-2"
              icon
              dark
              v-on="on"
            >
              <v-avatar
                size="36"
              >
                <img
                  :src="$auth.user.picture"
                  :alt="$auth.user.name"
                >
              </v-avatar>

        
              <!-- <v-icon>mdi-dots-vertical</v-icon> -->
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
          </v-list>
        </v-menu>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: "LoginComponent",
  data: () => ({
    drawer: null,
    right: null
  }),
  methods: {
    // Log the user in
    login() {
      //this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  },
};
</script>
