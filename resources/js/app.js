require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueX from 'vuex';
import { routes } from './routes/router';
import MainApp from './components/MainApp.vue';
import { initialize } from './helpers/general';
import StoreAuth from './store/auth'
import StoreCustomer from './store/customer'

Vue.use(VueRouter);
Vue.use(VueX);

const store = new VueX.Store({
	modules: {
		auth: StoreAuth,
		customer: StoreCustomer
	}
});

const router = new VueRouter({
	mode: 'history',
	routes
});

initialize(store, router);

const app = new Vue({
	el: '#app',
	router,
	store,
	render: h => h(MainApp)
});