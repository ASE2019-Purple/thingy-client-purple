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
    selectedDevice: [],
    plants: [],
    selectedPlants: []
  },
  getters: {
    dateRangeText: state => {
      // Daterange formatted for the selector
        return "" + format(state.startDate, 'd. MMM yy') + " ~ " + format(state.endDate, 'd. MMM yyy');
    },
    dateRangeISO: state => {
      return [state.startDate.toISOString().substr(0, 10),
             state.endDate.toISOString().substr(0, 10)];
    },
    devices: state => {
      return state.devices;
    },
    plants: state => {
      return state.plants;
    },
    plantsWithThings: state => {
     const items= state.plants.map(plant => Object.assign( plant, {
       thing: state.devices.filter(thing => thing.id===plant.thing_id).shift()
     }));
      return items;
    },
    thingys: state => {
      return state.devices.map(thingy => thingy.location);
    },
    selectedThingys: state => {
      return state.selectedDevice.location;
    },    
    selectedDevice: state => {
      return state.selectedDevice;
    },
    selectedPlants: state => {
      return state.selectedPlants;
    } 
  },
  mutations: {
    setDates(state, dates) {
      if (dates.length == 1) {
        state.startDate = new Date(dates[0]);
        state.endDate = state.startDate;
      } else {
        let d1 = new Date(dates[0]);
        let d2 = new Date(dates[1]);
        state.startDate = d1 <= d2 ? d1 : d2;
        state.endDate = d1 > d2 ? d1 : d2;
      }
    },
    selectDevice(state, thingyId) {
      state.selectedDevice = state.devices.filter(device => thingyId === device.id)[0];
    },
    setThingys (state, devices) {
      state.devices = devices;
      state.selectedDevice = state.devices[0];
    },
    setPlants (state, plants) {
      state.plants = plants;
      state.selectedPlants = state.plants;
    },
    selectPlants (state, plant_ids) {
      state.selectedPlants = state.plants.filter(plant => plant_ids.includes(plant.id));
    },

  },
  actions: {
   
  }
});


