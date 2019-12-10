import Vue from "vue";
import Vuex from "vuex";
import format from 'date-fns/format';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    startDate: new Date(),
    endDate: new Date(),
  },
  getters: {
    dateRangeText: state => {
      
      return "" + format(state.startDate, 'd. MMMM yyyy') + " ~ " + format(state.endDate, 'd. MMMM yyyy');
    },
    dateRangeISO: state => {
      // TODO maybe use moment 
      return [state.startDate.toISOString().substr(0, 10),
             state.endDate.toISOString().substr(0, 10)];
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


