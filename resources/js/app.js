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

const app = new Vue({
	el: '#app',
	router,
	store,
	render: h => h(MainApp)
});