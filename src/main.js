import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import router from "./router";

// Import the Auth0 configuration
import { domain, clientId, audience } from "../auth_config.json";

// Import the plugin here
import { Auth0Plugin } from "./auth";

import api from '@/api';

// Allow global access to api vie this.$api
Vue.prototype.$api = api;


import HighchartsVue from 'highcharts-vue';

Vue.use(HighchartsVue);

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

Vue.config.productionTip = false;


new Vue({
  store,
  vuetify,
  router,
  config: {
    API_URL: process.env.VUE_APP_THINGY_API
  },
  render: h => h(App)
}).$mount("#app");
