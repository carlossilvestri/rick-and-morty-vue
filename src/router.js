import Vue from "vue";
import Router from "vue-router";
import Welcome from "./views/Welcome.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
      { path: "/", name: "", component: Welcome },
      { path: "/home", name: "", component: () => import(/* webpackChunkName: "home" */ './views/Home.vue') }
    ],
});
