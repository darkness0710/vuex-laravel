<template>
    <div class="login row justify-content-center mt-50">
        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <div class="errors" v-if="errors">
                        <ul>
                            <li v-for="(fieldsError, fieldName) in errors" :key="fieldName">
                                <strong>{{ fieldName }}</strong> {{ fieldsError.join('\n') }}
                            </li>
                        </ul>
                    </div>
                    <form @submit.prevent="registerAccount">
                        <div class="form-group row">
                            <label for="email">Name:</label>
                            <input type="input" v-model="form.name" class="form-control" placeholder="Nickname" required>
                        </div>
                        <div class="form-group row">
                            <label for="email">Email:</label>
                            <input type="email" v-model="form.email" class="form-control" placeholder="Email Address" required>
                        </div>
                        <div class="form-group row">
                            <label for="password">Password:</label>
                            <input type="password" v-model="form.password" class="form-control" placeholder="Password" required>
                        </div>
                          <div class="form-group row">
                            <label for="password">Confirm Password:</label>
                            <input type="password" v-model="form.password_confirm" class="form-control" placeholder="Password" required>
                        </div>
                        <div class="form-group text-center row">
                            <input type="submit" value="Register" class="btn-block btn-primary">
                        </div>
                        <div class="form-group row" v-if="authError">
                            <p class="error">
                                {{ authError }}
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import validate from 'validate.js';
    import { setAuthorization } from "../../helpers/general";

    export default {
        name: "auth-register",
        data() {
            return {
                form: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirm: ''
                },
                errors: null
            };
        },
        methods: {
            registerAccount() {
                this.errors = null;
                const errors = validate(this.$data.form, this.getConstraints());
                if (errors) {
                    this.errors = errors;
                    return;
                }
                this.$store.dispatch('auth/register')
                    .then((res) => {
                        this.$router.push({path: '/'});
                    })
                    .catch((error) => {
                        //
                    });
            },
            getConstraints() {
                return {
                    name: {
                        presence: true,
                        length: {
                            minimum: 6,
                            message: 'Must be at least 6 digits long'
                        }
                    },
                    email: {
                        presence: true,
                        email: true
                    },
                    password: {
                        presence: true,
                        length: {
                            minimum: 6,
                            message: 'Must be at least 6 digits long'
                        }
                    },
                    password_confirm: {
                        presence: true,
                        length: {
                            minimum: 6,
                            message: 'Must be at least 6 digits long'
                        },
                        equality: 'password'
                    }
                };
            }
        },
        computed: {
            authError() {
                return this.$store.getters['auth/authError'];
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
