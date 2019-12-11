import Vue from "vue";
import Vuex from "vuex";
import format from 'date-fns/format';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    startDate: new Date(),
    endDate: new Date(),
    devices: [
      {id:1, name:"Fribourg"},
      {id:2, name:"Morat"},
      {id:3, name:"Bern"}
    ],
    selectedDevices: [
      {id:1, name:"Fribourg"}
    ] 
  },
  getters: {
    dateRangeText: state => {
      
      return "" + format(state.startDate, 'd. MMMM yyyy') + " ~ " + format(state.endDate, 'd. MMMM yyyy');
    },
    dateRangeISO: state => {
      // TODO maybe use moment 
      return [state.startDate.toISOString().substr(0, 10),
             state.endDate.toISOString().substr(0, 10)];
    },
    thingys: state => {
      return state.devices.map(thingy => thingy.name);
    },
    selectedThingys: state => {
      return state.selectedDevices.map(thingy => thingy.name);
    },    
    selectedDevices: state => {
      return state.selectedDevices;
    }
  },
  mutations: {
    setDates(state, dates) {
      
      let d1 = new Date(dates[0]);
      let d2 = new Date(dates[1]);
      state.startDate = d1 <= d2 ? d1 : d2;
      state.endDate = d1 > d2 ? d1 : d2;
    },
    selectDevices(state, names) {
      // Set thingys
      state.selectedDevices = state.devices.filter(device => names.includes(device.name));
    }
  },
  actions: {}
});


