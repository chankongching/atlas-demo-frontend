import Vue from 'vue';
import Router from 'vue-router';
import Demo from './views/Demo.vue';
import Home from './views/Home.vue';
import AML from './views/AML.vue';
import BusinessIntel from './views/Business-Intel.vue';
import WalletMetrics from './views/Wallet-Metrics.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'Home',
    //   component: Home,
    // },
    {
      path: '/',
      name: 'AML',
      component: AML,
    },
    {
      path: '/AML',
      name: 'AML',
      component: AML,
    },
    {
      path: '/BusinessIntel',
      name: 'BusinessIntel',
      component: WalletMetrics,
    },
    // {
    //   path: '/WalletMetrics',
    //   name: 'WalletMetrics',
    //   component: WalletMetrics,
    // },
    // {
    //   path: '/Demo',
    //   name: 'Demo',
    //   component: Demo,
    // },
  ],
});
