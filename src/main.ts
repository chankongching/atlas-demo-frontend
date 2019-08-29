import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import '@/styles/style.scss';
import $ from 'jquery'  
Vue.prototype.$ = $; 
import ECharts from 'vue-echarts';

import echarts from 'echarts';

Vue.prototype.$echarts = echarts;
Vue.component('v-chart', ECharts);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
