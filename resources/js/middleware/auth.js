export function requiresAuth(router, store) {
    router.beforeEach((to, from, next) => {
        const currentUser = store.getters['auth/currentUser'];
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        if (requiresAuth && !currentUser) {
            next('/login');
        }
        if (to.path == '/login' && currentUser) {
            next('/');
        }
        next();
    });
}