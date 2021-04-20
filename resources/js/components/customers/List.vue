<template>
    <div>
        <div class="btn-wrapper">
            <router-link to="/customers/new" class="btn btn-primary btn-sm">New</router-link>
        </div>
        <div class="row mb-25">
            <div class="col-md-4">
                <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1">@</span>
                    </div>
                    <input type="text" class="form-control" placeholder="Name" aria-label="Name" aria-describedby="basic-addon1" v-model="query.name">
                </div>
            </div>
            <div class="col-md-4">
                <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1">@</span>
                    </div>
                    <input type="text" class="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" v-model="query.email">
                </div>
            </div>
            <div class="col-md-4">
                <button type="button" class="btn btn-info" @click.prevent="search()">Search</button>
            </div>
        </div>
        <table class="table .table-striped">
            <thead>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
            </thead>
            <tbody>
                <template v-if="showListCustomers">
                    <tr>
                        <td colspan="4" class="text-center">No Customers Available</td>
                    </tr>
                </template>
                <template v-else>
                    <tr v-for="customer in customers.data" :key="customer.id">
                        <td>{{ customer.name }}</td>
                        <td>{{ customer.email }}</td>
                        <td>{{ customer.phone }}</td>
                        <td>
                            <router-link :to="`/customers/${customer.id}`" class="btn btn-primary">View</router-link>
                            <router-link :to="`/customers/${customer.id}/edit`" class="btn btn-success">Edit</router-link>
                            <input type="submit" value="Delete" class="btn btn-danger" @click.prevent="destroy(customer)">
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        <div class="pagination justify-content-center">
            <pagination :data="customers" :limit="options.limit" @pagination-change-page="getCustomers">
                <span slot="prev-nav">&lt; Previous</span>
                <span slot="next-nav">Next &gt;</span>
            </pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'customer-list',
        data() {
            return {
                customers: {
                    data: {},
                },
                query: {
                    name: '',
                    email: ''
                },
                options: {
                    limit: 2
                }
            }
        },
        mounted() {
            this.getCustomers();
        },
        methods: {
            destroy(customer) {
                this.$store.dispatch('customer/removeCustomer', customer.id)
                    .then((res) => {
                        let current_page = this.customers.current_page;
                        this.fetchListCustomers({page: current_page});
                    })
                    .catch((err) => {
                    });
            },
            getCustomers(page) {
                this.fetchListCustomers({page: page});
            },
            fetchListCustomers(payload) {
                this.$store.dispatch('customer/getCustomers', payload).then((res) => {
                    this.customers = this.$store.getters['customer/customers'];
                });
            },
            search() {
                this.fetchListCustomers(this.query);
            }
        },
        computed: {
            showListCustomers() {
                return !this.customers.data.length > 0;
            }
        }
    }
</script>

<style scoped>
	.btn-wrapper {
	    text-align: right;
	    margin-bottom: 20px;
	}
</style>