<template>
  <v-container fluid>
    <v-row justify="center">
      <highcharts
        class="chart"
        :options="chartOptions"
        :update-args="updateArgs"
      />
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ChartComponent",
  data () {
    return {
      chartTypes: [ "Spline", "AreaSpline", "Line", "Scatter", "Column", "Area" ],
      points: [10, 0, 8, 2, 6, 4, 5, 5],
      chartType: 'Spline',
      seriesColor: this.color,
      colorInputIsSupported: null,
      animationDuration: 1000,
      updateArgs: [true, true, {duration: 1000}],
      chartOptions: {
        chart: {
          type: 'spline'
        },
        title: {
          text: this.title
        },
        series: [{
          data: [10, 0, 8, 2, 6, 4, 5, 5],
          color: this.color
        }]
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
    this.fetchReportData()
  },
    methods: {
    fetchReportData () {
      /* this.loadingReportData = true
       * const url = this.$store.state.report.testApiUrl + this.widgetData.endPoint
       * fetch(url).then(
       *   response => { return response.json() },
       *   error => { console.log(error) }
       * ).then(
       *   data => {
       *     this.reportData = data
       *     this.loadingReportData = false
       *   }
       * ) */
    },
}
}
</script>

<style scoped>
</style>
