import Vue from "vue";
import Vuex from "vuex";
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    startDate: new Date(),
    endDate: new Date(),
    devices: [],
    selectedDevices: [],
    plants: [],
  },
  getters: {
    dateRangeText: state => {
    
        return "" + format(state.startDate, 'd. MMM yy') + " ~ " + format(state.endDate, 'd. MMM yyy');
    },
    dateRangeISO: state => {
      // TODO maybe use moment 
      return [state.startDate.toISOString().substr(0, 10),
             state.endDate.toISOString().substr(0, 10)];
    },
    devices: state => {
      return state.devices;
    },
    plants: state => {
      return state.plants;
    },
    thingys: state => {
      return state.devices.map(thingy => thingy.location);
    },
    selectedThingys: state => {
      return state.selectedDevices.map(thingy => thingy.location);
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
      state.selectedDevices = state.devices.filter(device => names.includes(device.location));
    },
    setThingys (state, devices) {
      state.devices = devices;
      state.selectDevices = state.devices;
    },
    setPlants (state, plants) {
      state.plants = plants;
      state.selectPlants = state.plants;
    },

  },
  actions: {
   
  }
});


