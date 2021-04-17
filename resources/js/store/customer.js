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
        getCustomers(context) {
            requestApi({method: 'get', url: 'api/customers'})
                .then((response) => {
                    context.commit('updateCustomers', response.data.customers);
                });
        },
        getCustomer(context, customerId) {
            return requestApi({method: 'get', url: `/api/customers/${customerId}`});
        },
        removeCustomer(context, customerId) {
            return new Promise((resolve, reject) => {
                axios.delete(`/api/customers/${customerId}`)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error.response.data.errors)
                    });
            });
        },
        updateCustomer(context, customer) {
            return new Promise((resolve, reject) => {
                axios.put(`/api/customers/${customer.id}`, customer)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error.response.data.errors)
                    });
            });
        }
    }
}