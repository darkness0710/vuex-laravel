<template>
    <div class="customer-view" v-if="customer">
        <div class="user-img">
            <img src="https://www.scottsdaleazestateplanning.com/wp-content/uploads/2018/01/user.png" alt="">
        </div>
        <div class="user-info">
            <table class="table">
                <tr>
                    <th>ID</th>
                    <td>{{ customer.id }}</td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td>{{ customer.name }}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>{{ customer.email }}</td>
                </tr>
                <tr>
                    <th>Phone</th>
                    <td>{{ customer.phone }}</td>
                </tr>
                <tr>
                    <th>Website</th>
                    <td>{{ customer.website }}</td>
                </tr>
            </table>
            <router-link to="/customers" class="float-right btn btn-primary ml-1">Back to list customers</router-link>
            <router-link :to="`/customers/${customer.id}/edit`" class="float-right btn btn-success">Edit</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'view',
        created() {
            this.$store.dispatch('getCustomer', this.$route.params.id)
                .then((res) => {
                    this.$data.customer = res.data.customer;
                })
                .catch((err) => {
                    this.$router.push('/404');
                });
        },
        data() {
            return {
                customer: null
            };
        },
        computed: {
            currentUser() {
                return this.$store.getters.currentUser;
            },
            customers() {
                return this.$store.getters.customers;
            }
        }
    }
</script>

<style scoped>
.customer-view {
    display: flex;
    align-items: center;
}
.user-img {
    flex: 1;
}
.user-img img {
    max-width: 160px;
}
.user-info {
    flex: 3;
    /*overflow-x: scroll;*/
}
</style>