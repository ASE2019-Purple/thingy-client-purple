<template>
  <div>
    <template v-if="!$auth.loading">
      <v-btn outlined
        v-if="!$auth.isAuthenticated"
        @click="login"
      >
        <v-icon>mdi-login</v-icon>
        Login
      </v-btn>

      <template v-else>
        <v-avatar
          size="36"
          class="pa-8"
        >
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
            <v-btn
              icon
              v-on="on"
            >
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
      this.$auth.loginWithRedirect();
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
