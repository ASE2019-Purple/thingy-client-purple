<template>
  <div id="app">
    <v-container fluid>
      <v-row
        justify="center"
      >
        <v-col
          cols="12"
          sm="6"
        >
          <keep-alive>
            <chart
              title="Temperature"
              color="#EBCB8B"
              api-endpoint="temperature"
            />
          </keep-alive>
        </v-col>


        <v-col
          cols="12"
          sm="6"
        >
          <keep-alive>
            <chart
              title="Humidity"
              color="#8FBCBB"
              api-endpoint="humidity"
            />
          </keep-alive>
        </v-col>
      </v-row>


      <v-row
        class="mb-6"
        justify="center"
      >
        <v-col
          cols="12"
          sm="6"
        >
          <keep-alive>
            <chart
              title="Pressure"
              color="#4C566A"
              api-endpoint="pressure"
            />
          </keep-alive>
        </v-col>


        <v-col
          cols="12"
          sm="6"
        >
          <keep-alive>
            <ChartComponent
              title="Air Quality"
              color="#5E81AC"
              api-endpoint="air-quality"
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
      currentView: 'chart'
    }
  },
  components: {
    chart: ChartComponent,
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
