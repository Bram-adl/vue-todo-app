import Vue from 'vue';
import VueRouter from 'vue-router';
import Master from './layouts/Master.vue';

import { store } from './store';
import { routes } from './router';

import 'animate.css';

Vue.prototype.eventBus = new Vue();
Vue.config.productionTip = false;

Vue.directive('focus', {
  inserted: function (el) {
    el.focus();
  }
});

const router = new VueRouter({
	mode: 'history',
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if (!store.getters.isLoggedIn ) {
			next({
				name: 'Login',
				query: { redirect: to.fullPath },
			});
		} else {
			next();
		}
	} else if (to.matched.some(record => record.meta.requiresVisitor)) {
    // this route requires visitors, check if logged in
    // if not, redirect to todo page.
    if (store.getters.isLoggedIn) {
      next({
        name: 'Todo',
      });
    } else {
      next();
    }
  } else {
		next();
	}
});

new Vue({
  render: h => h(Master),
  store,
  router,
}).$mount('#app');
