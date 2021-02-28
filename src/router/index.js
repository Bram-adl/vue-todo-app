import Vue from 'vue';
import VueRouter from 'vue-router';

import App from '../App.vue';
import LandingPage from '../pages/LandingPage.vue';
import AboutPage from '../pages/AboutPage.vue';
import Login from '../auth/Login.vue';
import Register from '../auth/Register.vue';
import Logout from '../auth/Logout.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/todo',
		name: 'Todo',
		component: App,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/',
		name: 'Home',
		component: LandingPage,
	},
	{
		path: '/about',
		name: 'About',
		component: AboutPage,
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
		meta: {
			requiresVisitor: true,
		},
	},
	{
		path: '/register',
		name: 'Register',
		component: Register,
		meta: {
			requiresVisitor: true,
		},
	},
	{
		path: '/logout',
		name: 'Logout',
		component: Logout,
	},
];

export { routes };