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

    /**
     *Get for each selected plant the watering prediction
     * and add them as events to the calendar.
    */
    fetchEvents() {
      this.events = []

      
      for (let plant of this.$store.getters.selectedPlants) {
        this.$api.plants.prediction(plant.id).then(
          response => {
            
            if (response.status === 200){
              for (let item of response.data){
                if (item.watering){
                  this.events.push({
                    
                    start: item.date,
                    end: item.date,
                    title: `Water ${plant.name}`,
                    content: '<v-icon>mdi-water-pump</v-icon>',
                    class: 'watering'
                    
                  })
                }
              }
            }

          }
        ).catch(error => {
          //console.log(error)
        })
      }
    }
  },
  data () {
    return {
      info: null,
      url: "",
      events: []
      
    }
  },
  mounted () {
    this.fetchEvents()
  },
  watch: {
    selectedPlants (plants) {
      this.fetchEvents()
    }
  },
  computed: mapState({
    startDate: state => state.startDate,
    endDate: state => state.endDate,
    selectedPlants: state => state.selectedPlants
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
