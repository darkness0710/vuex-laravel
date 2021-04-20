import { requiresAuth } from '../middleware/auth';

export function initialize(store, router)
{
	const currentUser = store.getters['auth/currentUser'];

	requiresAuth(router, store);

	axios.interceptors.response.use(null, (error) => {
		if (error.response.status == 401 && router.currentRoute.name != 'auth.login') {
			store.commit('auth/logout');
			router.push('/login');
		}
	});

	if (currentUser) {
        setAuthorization(store.getters['auth/currentUser'].token);
    }
}

export function setAuthorization(token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}
