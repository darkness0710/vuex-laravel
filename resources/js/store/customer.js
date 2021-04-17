import { requestApi } from "../helpers/axios";

export default {
	namespaced: true,
    state: {
        customers: []
    },
    getters: {
        customers(state) {
            return state.customers;
        }
    },
    mutations: {
        updateCustomers(state, payload) {
            state.customers = payload;
        }
    },
    actions: {
        createCustomer(context, customer) {
            return requestApi({method: 'post', url: '/api/customers/', params: customer});
        },
        getCustomers(context) {
            return requestApi({method: 'get', url: 'api/customers'})
                .then((response) => {
                    context.commit('updateCustomers', response.data.customers);
                });
        },
        getCustomer(context, customerId) {
            return requestApi({method: 'get', url: `/api/customers/${customerId}`});
        },
        removeCustomer(context, customerId) {
            return requestApi({method: 'delete', url: `/api/customers/${customerId}`});
        },
        updateCustomer(context, customer) {
            return requestApi({method: 'put', url: `/api/customers/${customer.id}`, params: customer});
        }
    }
}