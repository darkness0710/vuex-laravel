<template>
    <div>
        <div class="btn-wrapper">
            <router-link to="/customers/new" class="btn btn-primary btn-sm">New</router-link>
        </div>
        <table class="table .table-striped">
            <thead>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
            </thead>
            <tbody>
                <template v-if="!customers.length">
                    <tr>
                        <td colspan="4" class="text-center">No Customers Available</td>
                    </tr>
                </template>
                <template v-else>
                    <tr v-for="customer in customers" :key="customer.id">
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
    </div>
</template>

<script>
    export default {
        name: 'customer-list',
        mounted() {
            this.$store.dispatch('customer/getCustomers');
        },
        methods: {
            destroy(customer) {
                this.$store.dispatch('customer/removeCustomer', customer.id)
                    .then((res) => {
                        this.$store.dispatch('customer/getCustomers');
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        computed: {
            customers() {
                return this.$store.getters['customer/customers'];
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