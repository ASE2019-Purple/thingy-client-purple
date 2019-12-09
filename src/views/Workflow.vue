<template>
  <v-container fluid>
    <v-row justify="space-around">
      <v-sheet>
        <v-list-item three-line>
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
        </v-list-item>

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
  name: "Workflow",
  methods: {
    async callProfile() {
      const token = await this.$auth.getTokenSilently();
      // TODO set the API path in configuration
      this.url = "http://localhost:8000/profile";
      this.info = "";
      axios.get(this.url, {
        headers: {
          Authorization: 'Bearer ' + token // send the access token through the 'Authorization' header
        }
      }).then(response => {
        this.info = response.data;
      }).catch(error => {
        this.info = error}
      );
      
    },
    async callProtected() {
      const token = await this.$auth.getTokenSilently();
      // TODO set the API path in configuration
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
    /* TODO get host of the thingy-api from env  */
    axios
      .get('http://localhost:8000/')
      .then(response => (this.info = response.data))
    
  }
};
</script>
