import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    startDate: new Date(),
    endDate: new Date(),
  },
  getters: {
    dateRangeText: state => {
      // TODO maybe use moment 
      return "" + state.startDate + " ~ " + state.endDate;
    }
  },
  mutations: {
    setDates(state, dates) {
      
      let d1 = new Date(dates[0]);
      let d2 = new Date(dates[1]);
      state.startDate = d1 <= d2 ? d1 : d2;
      state.endDate = d1 > d2 ? d1 : d2;
    }
  },
  actions: {}
});


