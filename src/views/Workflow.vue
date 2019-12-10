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
    <v-row>
      <v-col>
        <vue-cal
          hide-view-selector
          default-view="week"
          style="height: 550px"
          :min-date="startDate"
          :max-date="endDate"
          :events="events"
          selected-date="2019-12-10"
          :time="false"
          :disable-views="['years', 'year']"
        />
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
import axios from "axios"
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import { mapState } from 'vuex'


export default {
  name: "Workflow",
  components: {
    VueCal
  },
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
      events: [
    {
      start: '2019-12-10',
      end: '2019-12-10',
      title: 'Water the plants!',
      content: '<v-icon>mdi-settings</v-icon>',
      class: 'watering'
    },
{
      start: '2019-12-13',
      end: '2019-12-13',
      title: 'Water the goddamn plants!',
      content: '<i class="v-icon material-icons">shopping_cart</i>',
      class: 'watering'
    }
      ]
      
    }
  },
  mounted () {
    /* TODO get host of the thingy-api from env  */
    axios
      .get('http://localhost:8000/')
      .then(response => (this.info = response.data))
    
  },
  computed: mapState({
    startDate: state => state.startDate,
    endDate: state => state.endDate
  })
};
</script>


<style>
.vuecal__cell.disabled {text-decoration: line-through;}
.vuecal__cell.disabled.before-min {color: #b6d6c7;}
.vuecal__cell.disabled.after-max {color: #008b8b;}

.vuecal__event.watering {background-color: rgba(253, 156, 66, 0.9);border: 1px solid rgb(233, 136, 46);color: #fff;}
</style>
