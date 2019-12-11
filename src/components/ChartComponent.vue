<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="11"
      >
        <highcharts
          class="chart"
          :options="chartOptions"
          :update-args="updateArgs"
        />
      </v-col>
      <v-col
        cols="12"
        sm="1"
      >
        <v-btn
          icon
          @click="fetchData"
        >
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios"
import { mapState } from 'vuex'

export default {
  name: "ChartComponent",
  data () {
    return {
      chartTypes: [ "Spline", "AreaSpline", "Line", "Scatter", "Column", "Area" ],
      points: [],
      chartType: 'Spline',
      seriesColor: this.color,
      colorInputIsSupported: null,
      animationDuration: 1000,
      updateArgs: [true, true, true,{duration: 1000}],
      chartOptions: {
        chart: {
          type: 'spline',
          zoomType: 'x'
        },
        
        title: {
          text: this.title
        },
        xAxis: {
          type: 'datetime',
          
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, this.color],
                [1, "#ECEFF4"]
              ]
            },
            marker: {
              radius: 2
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },
        series: [{
          data: [],
          color: this.color,
          type: 'area',
          name: this.title
        },
                 {
          data: [],
          color: this.color,
          type: 'area',
          name: this.title
                 },
                 {
          data: [],
          color: this.color,
          type: 'area',
          name: this.title
        }
        ]
      }
    }
  },
  watch: {
    title (newValue) {
      this.chartOptions.title.text = newValue
    },
    chartType (newValue) {
      this.chartOptions.chart.type = newValue.toLowerCase()
    },
    seriesColor (newValue) {
      this.chartOptions.series[0].color = newValue.toLowerCase()
    },
    animationDuration (newValue) {
      this.updateArgs[2].duration = Number(newValue)
    }
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "#6fcd98"
    },
    apiEndpoint: {
      type: String,
      default: ""
    }
  },
  created () {
    this.fetchData()
    console.log("created")
  },
  computed: mapState({
    selectedDevices: state => state.selectedDevices,
  }),
  
  methods: {
    
    async fetchData () {

      const token = await this.$auth.getTokenSilently();

      console.log(this.selectedDevices[0])

      for (let thingy in this.selectedDevices){
        console.log(thingy)

        
        /* this.chartOptions.series[thingy] = {
         *   data: [],
         *   color: this.color,
         *   type: 'area',
         *   name: this.title
         * } */
        
        //this.selectedDevices[thingy].id

        
        await this.$api.property.get(this.selectedDevices[thingy].id, this.apiEndpoint, {
          headers: {
            Authorization: 'Bearer ' + token // send the access token through the 'Authorization' header
        }}).then(response => {
        
          let data = []

        // Add data to the graph in minute resolution
        // Second resolution is too much and doesn't render...
        
        let datetime, time;
        
        response.data[0].forEach(point => {
          
          // Strip seconds and miliseconds
          time = point.time.slice(0,16)
          
          if (datetime !== time){
            datetime = time
            data.push([Date(datetime), point.value])
          } 

        })


        this.chartOptions.series[0].data = data
        
      }).catch(error => {

        console.log("Failed to get data - using sample data");
        console.log(error);

      });




      }
    },
  }
}
</script>

<style scoped>
</style>
