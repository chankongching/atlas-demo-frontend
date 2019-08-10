import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import '@/styles/style.scss';

import ECharts from 'vue-echarts';

Vue.component('v-chart', ECharts);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
