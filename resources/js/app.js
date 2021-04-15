require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueX from 'vuex';
import { routes } from './routes';
import MainApp from './components/MainApp.vue';
import StoreData from './store';

Vue.use(VueRouter);
Vue.use(VueX);

const store = new VueX.Store(StoreData);

const router = new VueRouter({
	mode: 'history',
	routes
});

router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
	const currentUser = store.state.currentUser;
	if (requiresAuth && !currentUser) {
		next('/login');
	} else if (to.patch == '/login' && currentUser) {
		next('/');
	} else {
		next();
	}
})

const app = new Vue({
	el: '#app',
	router,
	store,
	render: h => h(MainApp)
});