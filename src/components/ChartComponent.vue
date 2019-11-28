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

let getJSON = function(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

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
      updateArgs: [true, true, {duration: 1000}],
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
    methods: {
      async fetchData () {

        let sampleDataPoints;
        getJSON('http://localhost:8080/air-quality',
                function(err, data) {
                  sampleDataPoints = data;
                  if (err !== null) {
                    alert('Something went wrong: ' + err);
                  } else {
                    alert('Your query count: ' + data.query.count);
                  }
                });

        // TODO Test
        const token = await this.$auth.getTokenSilently();

        this.url = "http://localhost:8081/" + this.apiEndpoint
        this.info = "";
        
        axios.get(this.url, {
          headers: {
            Authorization: 'Bearer ' + token // send the access token through the 'Authorization' header
          }
        }).then(response => {

          // TODO is this really a double wrapped list?
          let data = []
          console.log(response)
          console.log(response.data)
          this.chartOptions.series[0].data = []
          response.data[0].forEach(point => {
            data.push([Date(point.time), point.value])
            })
            //console.log(Date(point.time))
        this.chartOptions.series[0].data = data
            
        }).catch(error => {
            let data = []
            sampleDataPoints[0].forEach(point => {
              data.push([Date(point.time), point.value])
              //console.log(Date(point.time))
            })
            console.log("Using sample data");
          this.chartOptions.series[0].data = data

          });

    },
}
}
</script>

<style scoped>
</style>
