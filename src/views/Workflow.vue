<template>
  <v-container fluid>
    <v-row justify="space-around">
      <!-- <v-col
           cols="6"
           >
           <PlantFormComponent />
           </v-col> -->

      <v-col
        cols="6"
      >
        <WeatherCardComponent />
      </v-col>
    </v-row>


     
    <v-row>
      <v-col>
        <VueCal
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
import WeatherCardComponent from "@/components/WeatherCardComponent.vue"

export default {
  name: "Workflow",
  components: {
    VueCal: VueCal,
    WeatherCardComponent: WeatherCardComponent
  },
  methods: {
   
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
