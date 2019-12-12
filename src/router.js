import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Profile from "./views/Profile.vue";
import Workflow from "./views/Workflow.vue";
import Monitor from "./views/Monitor.vue";

import { authGuard } from "./auth/authGuard";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/default",
      name: "home",
      component: Home
    },
     {
      path: "/",
      name: "Monitor",
      component: Monitor,
      beforeEnter: authGuard

     },
       {
      path: "/workflow",
      name: "Workflow",
      component: Workflow,
      beforeEnter: authGuard
     },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      beforeEnter: authGuard
    }
  ]
});
