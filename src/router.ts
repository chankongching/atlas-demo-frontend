import Vue from 'vue';
import Router from 'vue-router';
import Demo from './views/Demo.vue';
import Home from './views/Home.vue';
import AML from './views/AML.vue';
import BusinessIntel from './views/Business-Intel.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/AML',
      name: 'AML',
      component: AML,
    },
    {
      path: '/BusinessIntel',
      name: 'BusinessIntel',
      component: BusinessIntel,
    },
    {
      path: '/Demo',
      name: 'Demo',
      component: Demo,
    },
  ],
});
