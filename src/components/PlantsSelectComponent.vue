<template>
  <v-card flat>
    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col
            v-for="thing in thingys"
            :key="thing.id"
            cols="12"
            sm="4"
            md="4"
          >
            <h3>{{ thing.location }}</h3>
            <v-checkbox
              v-for="plant in plants.filter(plant => plant.thing_id == thing.id)"
              v-model="selected"
              :key="plant.id"
              :label="plant.name"
              color="green" 
              :value="plant.id"
              hide-details
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'


export default {
  name: "PlantsSelectComponent",
    data () {
      return {
        selected:  this.$store.getters.selectedPlants.map(plant => plant.id),
      }
    },
  watch: {
    selected (selected) {this.$store.commit('selectPlants', selected)}
  },
  computed: mapState({

    thingys: state => {
      return state.devices;
    },

    plants: state => state.plants,
  })
  }
</script>
