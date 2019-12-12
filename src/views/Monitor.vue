<template>
  <div id="app">
    <v-container fluid>
      <v-row
        justify="center"
      >
        <v-col
          v-for="chart in charts"
          :key="chart.property"
          cols="12"
          sm="6"
        >
          <keep-alive>
            <ChartComponent
              :title="chart.title"
              :color="chart.color"
              :api-endpoint="chart.property"
            />
          </keep-alive>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ChartComponent from '../components/ChartComponent.vue'

export default {
  name: 'Monitor',
  data () {
    return {
      selected: 'chart',
      currentView: 'chart',
      charts: [
        {
          title: "Air Quality",
          color: "#5E81AC",
          property: "airquality"
        },
        {
          title: "Humidity",
          color: "#8FBCBB",
          property: "humidity"
        },
        {
          title: "Temperature",
          color: "#EBCB8B",
          property: "temperature"
        },
        {
          title: "Pressure",
          color: "#4C566A",
          property: "pressure"
        }
      ]
    }
  },
  components: {
    ChartComponent: ChartComponent
  },
  methods: {
    activate (elem) {
      this.selected = elem
    },
    handler () {
      let args = arguments
      for (let arg of args) {
        if (arg instanceof Function) {
          arg()
        }
      }
    },
    select (elem) {
      this.currentView = elem
      this.activate(elem)
    }
  }
}
</script>

<style>




</style>
