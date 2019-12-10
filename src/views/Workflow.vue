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
          default-view="month"
          style="height: 550px"
          :min-date="startDate"
          :max-date="endDate"
          :events="events"
          events-on-month-view="short"
          :selected-date="startDate"
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
      content: '<v-icon>mdi-water-pump</v-icon>',
      class: 'watering'
    },
{
      start: '2019-12-13',
      end: '2019-12-13',
      title: 'Water the plants!',
      content: '<v-icon>mdi-water-pump</v-icon>',
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
.vuecal__cell.disabled {}
.vuecal__cell.disabled.before-min {color: #4C566A;}
.vuecal__cell.disabled.after-max {color: #4C566A;}

.vuecal__event.watering {
  background-color: #5E81AC;
  border: 1px solid #E5E9F0;
  color: #E5E9F0;
}
</style>
