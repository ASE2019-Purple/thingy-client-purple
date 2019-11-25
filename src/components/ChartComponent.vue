<template>
  <v-container fluid>
    <v-row justify="center">
      <highcharts
        class="chart"
        :options="chartOptions"
        :update-args="updateArgs"
      />
    </v-row>
    
    <v-row>
      <v-col
        cols="12"
        sm="4"
      >
        <v-text-field
          label="Chart title"
          v-model="title"
        />
      </v-col>
      
      <v-col
        cols="12"
        sm="4"
      >
        <v-select
          v-model="chartType"
          :items="chartTypes"
          label="Chart Type"
        />
      </v-col>

      <v-col
        cols="12"
        sm="4"
      >
        <v-select
          v-model="animationDuration"
          :items="[0,500,1000,2000]"
          label="Animation duration"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ChartComponent",
  data () {
    return {
      chartTypes: [ "Spline", "AreaSpline", "Line", "Scatter", "Column", "Area" ],
      colors: ["Red", "Green", "Blue"],
      title: '',
      points: [10, 0, 8, 2, 6, 4, 5, 5],
      chartType: 'Spline',
      seriesColor: '#6fcd98',
      colorInputIsSupported: null,
      animationDuration: 1000,
      updateArgs: [true, true, {duration: 1000}],
      chartOptions: {
        chart: {
          type: 'spline'
        },
        title: {
          text: 'Sin chart'
        },
        series: [{
          data: [10, 0, 8, 2, 6, 4, 5, 5],
          color: '#6fcd98'
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
  }
}
</script>

<style scoped>
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}
#colorPicker {
  border: 0;
  padding: 0;
  margin: 0;
  width: 30px;
  height: 30px;
}
.numberInput {
  width: 30px;
}
</style>
