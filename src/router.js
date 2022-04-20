import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
      { path: "/", name: "",  component: () => import(/* webpackChunkName: "Welcome" */ './views/Welcome.vue')},
      { path: "/app", name: "", component: () => import(/* webpackChunkName: "app - ContainerMain" */ './components/ContainerMain.vue'),
          children: [
            { path: "/app/home", name: "Home", component: () => import(/* webpackChunkName: "Home" */ './views/Home.vue')},
            { path: "/app/favorites", name: "Favorites", component: () => import(/* webpackChunkName: "Favorites" */ './views/Favorites.vue')},
          ] 
        },
        { path: '*', redirect: '/' }
    ],
});
