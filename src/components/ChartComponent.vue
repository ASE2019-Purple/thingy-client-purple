<template>
  <highcharts
    class="chart"
    :options="chartOptions"
    :update-args="updateArgs"
  />
</template>

<script>
    import axios from "axios"
    import {mapState} from 'vuex'
    import format from 'date-fns/format';

    export default {
        name: "ChartComponent",
        data() {
            return {
                points: [],
                chartType: 'Spline',
                seriesColor: this.color,
                colorInputIsSupported: null,
                animationDuration: 1000,
                updateArgs: [true, true, true, {duration: 1000}],
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
            seriesColor(newValue) {
                this.chartOptions.series[0].color = newValue.toLowerCase()
            },
            animationDuration(newValue) {
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
        created() {
            this.fetchData();
        },
      watch: {
        selectedDevice (device) {
          this.fetchData()
        },
        startDate (device) {
          this.fetchData()
        }
      },
        computed: mapState({
          selectedDevice: state => state.selectedDevice,
          startDate: state => state.startDate,
          endDate: state => state.endDate,
        }),

        methods: {

            async fetchData() {

                const token = await this.$auth.getTokenSilently();

                if (this.selectedDevice) {

                  await this.$api.property.get(this.selectedDevice.id, this.apiEndpoint, {
                    params: {
                      start_date: format(this.startDate, 'y-MM-dd'),
                      end_date: format(this.endDate, 'y-MM-dd')
                    },
                    headers: {
                      Authorization: 'Bearer ' + token
                    }
                    }).then(response => {

                        /*
                           Filter the response data.
                           *Note:* Resolution in seconds is too much to display, thus
                           we add only one entry per minute.
                         */
                        let data = [];
                        let last, curr;

                        response.data.forEach(point => {

                          // Strip seconds and miliseconds
                          curr = point.time.slice(0, 16);

                            if (last !== curr) {
                                last = curr;
                                data.push([(new Date(point.time)).getTime(), point.value])
                            }

                        });

                        // Update the chart data
                        this.chartOptions.series[0].data = data

                    }).catch(error => {
                        //console.log("Failed to get data - using sample data");
                        //console.log(error);
                    });

                }
            },
        }
    }
</script>

<style scoped>
</style>
