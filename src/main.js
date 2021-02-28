import Vue from 'vue';
import Master from './layouts/Master.vue';

import { store } from './store';
import { router } from './router';

import 'animate.css';

Vue.prototype.eventBus = new Vue();
Vue.config.productionTip = false;

Vue.directive('focus', {
  inserted: function (el) {
    el.focus();
  }
});

new Vue({
  render: h => h(Master),
  store,
  router,
}).$mount('#app');
