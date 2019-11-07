<template>
  <v-container fluid>
    <v-row justify="space-around">
      <v-sheet>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">
              Logged in as
            </div>
            <v-list-item-title class="headline mb-1">
              {{
                $auth.user.name
              }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ $auth.user.email }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar
            tile
            size="80"
          >
            <img
              :src="$auth.user.picture"
              :alt="$auth.user.name"
            >
          </v-list-item-avatar>
        </v-list-item>


        
        <v-btn
          color="error"
          @click="callPublic"
          class="mx-2"
        >
          Call Public
        </v-btn>

        <v-btn
          class="mr-2"
          color="warning"
          @click="callProtected"
        >
          Call Protected
        </v-btn>

        <v-btn
          color="success"
          @click="callProfile"
        >
          Get Profile
        </v-btn>
        
        <v-list-item>
          {{ url }}
        </v-list-item>
        <v-list-item>
          {{ info }}
        </v-list-item>
      </v-sheet>
    </v-row>
  </v-container>
</template>



<script>
import axios from "axios"

export default {
  name: "Profile",
  methods: {
    async callProfile() {
      const token = await this.$auth.getTokenSilently();
      this.url = "http://localhost:8000/profile";
      this.info = "";
      axios.get(this.url, {
        headers: {
          Authorization: 'Bearer ' + token // send the access token through the 'Authorization' header
        }
      }).then(response => {
        this.info = response.data;
      }).catch(error => {
        console.log(error);
        this.info = error}
      );
      
    },
    async callProtected() {
      const token = await this.$auth.getTokenSilently();
      
      this.url = "http://localhost:8000/protected"
      this.info = "";
      axios.get(this.url, {
        headers: {
          Authorization: 'Bearer ' + token // send the access token through the 'Authorization' header
        }
      }).then(response => {
        this.info = response.data;
      }).catch(error => {
        console.log(error);
        this.info = error}
      );

    },
    async callPublic() {
      // Get the access token from the auth wrapper
      const token = await this.$auth.getTokenSilently();
      this.url = "http://localhost:8000/public";
      this.info = "";
      // Use Axios to make a call to the API
      const { data } = await axios.get(this.url, {
        headers: {
          Authorization: 'Bearer ' + token, // send the access token through the 'Authorization' header
        }
      });

      this.info = data;
      
    }
  },
  data () {
    return {
      info: null,
      url: "",
    }
  },
  mounted () {
    /* TODO get host of the thingy-api dynamically  */
    axios
      .get('http://localhost:8000/')
      .then(response => (this.info = response.data))
    
  }
};
</script>
