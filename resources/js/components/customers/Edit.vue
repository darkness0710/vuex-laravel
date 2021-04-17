<template>
    <div class="customer-new">
        <div class="errors" v-if="errors">
            <ul>
                <li v-for="(fieldsError, fieldName) in errors" :key="fieldName">
                    <strong>{{ fieldName }}</strong> {{ fieldsError.join('\n') }}
                </li>
            </ul>
        </div>
        <form @submit.prevent="update">
            <table class="table">
                <tr>
                    <th>Name</th>
                    <td>
                        <input type="text" class="form-control" v-model="customer.name" placeholder="Customer Name" required/>
                    </td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>
                        <input type="email" class="form-control" v-model="customer.email" placeholder="Customer Email" required/>
                    </td>
                </tr>
                <tr>
                    <th>Phone</th>
                    <td>
                        <input type="text" class="form-control" v-model="customer.phone" placeholder="Customer Phone" required/>
                    </td>
                </tr>
                <tr>
                    <th>Website</th>
                    <td>
                        <input type="text" class="form-control" v-model="customer.website" placeholder="Customer Website" required/>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td class="text-right">
                        <router-link to="/customers" class="btn btn-danger">Cancel</router-link>
                        <input type="submit" value="Update" class="btn btn-primary">
                    </td>
                </tr>
            </table>
        </form>
    </div>
</template>

<script>
    import validate from 'validate.js';
    export default {
        name: 'customer-new',
        data() {
            return {
                customer: {
                    name: '',
                    email: '',
                    phone: '',
                    website: ''
                },
                errors: null
            };
        },
        created() {
            this.$store.dispatch('customer/getCustomer', this.$route.params.id)
                .then((res) => {
                    this.$data.customer = res.data.customer;
                })
                .catch((err) => {
                    this.$router.push('/404');
                });
        },
        methods: {
            update() {
                this.errors = null;
                const constraints = this.getConstraints();
                const errors = validate(this.$data.customer, constraints);
                if (errors) {
                    this.errors = errors;
                    return;
                }
                this.$store.dispatch('customer/updateCustomer', this.$data.customer)
                    .then((res) => {
                        this.$router.push({name:'customers.view', params: {id: res.data.customer.id, message: 'Update success!'}});
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            getConstraints() {
                return {
                    name: {
                        presence: true,
                        length: {
                            minimum: 3,
                            message: 'Must be at least 3 characters long'
                        }
                    },
                    email: {
                        presence: true,
                        email: true
                    },
                    phone: {
                        presence: true,
                        numericality: true,
                        length: {
                            minimum: 10,
                            message: 'Must be at least 10 digits long'
                        }
                    },
                    website: {
                        presence: true,
                        url: true
                    }
                };
            }
        }
    }
</script>

<style scoped>
    .errors {
        background: lightcoral;
        border-radius:5px;
        padding: 21px 0 2px 0;
    }
</style>