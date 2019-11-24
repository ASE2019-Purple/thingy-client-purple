<template>
  <div id="app">
    <h3>Select chart constructor:</h3>
    <div class="button-grp">
      <button
        @click="select('chart')"
        :class="{btnActive: selected === 'chart'}"
      >
        Chart
      </button>
    </div>
    <keep-alive>
      <component :is="currentView" />
    </keep-alive>
  </div>
</template>

<script>
import ChartComponent from '../components/ChartComponent.vue'

export default {
  name: 'Chartview',
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: navajowhite;
  margin: 0 auto;
  margin-top: 60px;
  width: 70%;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.row > * {
  padding: 0 20px;
}
.logos {
  margin: 0 auto;
  width:50%;
}
.logo-hc {
  width: 70%;
  height: auto;
}
.logo-vue {
  width: 15%;
  height: auto;
}
.button-grp {
  margin: 20px 0;
}
button {
  padding: 10px 20px;
  outline: none;
  background: #828ea0;
  color: #fff;
  font-size: 16px;
  margin: 5px;
  border: 0;
}
button:hover {
  background: #a7aeb8;
  transition: background 0.2s;
}
button:active {
  color: rgb(117, 117, 117);
}
.btnActive {
  color: #6fcd98
}
</style>
