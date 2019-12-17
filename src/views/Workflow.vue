<template>
  <v-container fluid>
    <v-row justify="space-around">
      <!-- <v-col
           cols="6"
           >
           <PlantFormComponent />
             <WeatherCardComponent />
           </v-col> -->

      <v-col
        cols="6"
      >

        <PlantsSelectsComponent />
      
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
import PlantsSelectsComponent from "@/components/PlantsSelectComponent.vue"
export default {
  name: "Workflow",
  components: {
    VueCal: VueCal,
 //   WeatherCardComponent: WeatherCardComponent,
    PlantsSelectsComponent: PlantsSelectsComponent
  },
  methods: {
   
  },
  data () {
    return {
      info: null,
      url: "",
    
      
    }
  },
  mounted () {

  },
  computed: mapState({
    startDate: state => state.startDate,
    endDate: state => state.endDate,
    events (state) {
      return state.selectedPlants.map(plant => ({
        
      start: '2019-12-10',
      end: '2019-12-10',
      title: `Water ${plant.name}`,
      content: '<v-icon>mdi-water-pump</v-icon>',
      class: 'watering'
    
      }))
    }
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
