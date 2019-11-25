<template>
  <div id="app">
    <v-row
      class="mb-6"
      justify="center"
    >
      <v-col
        md="auto"
        sm="8"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <v-btn-toggle
            borderless
          >
            <v-btn
              value="chart"
              @click="select('chart')"
              :class="{btnActive: selected === 'chart'}"
            >
              <span class="hidden-sm-and-down">Chart</span>
            </v-btn>
          </v-btn-toggle>
        </v-card>
      </v-col>
    </v-row>

    <v-row
      class="mb-6"
      justify="center"
    >
      <v-col md="auto">
        <keep-alive>
          <component :is="currentView" />
        </keep-alive>
      </v-col>
    </v-row>
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
    chart: ChartComponent
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
