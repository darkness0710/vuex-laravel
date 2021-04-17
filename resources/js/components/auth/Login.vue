<template>
    <div class="login row justify-content-center mt-50">
        <div class="col-md-4">
            <div class="card">
                <div class="card-header">Login Form</div>
                <div class="card-body">
                    <form @submit.prevent="authenticate">
                        <div class="form-group row">
                            <label for="email">Email:</label>
                            <input type="email" v-model="form.email" class="form-control" placeholder="Email Address">
                        </div>
                        <div class="form-group row">
                            <label for="password">Password:</label>
                            <input type="password" v-model="form.password" class="form-control" placeholder="Password">
                        </div>
                        <div class="form-group row">
                            <input type="submit" value="Login">
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
    import { login } from '../../helpers/auth';
    import { setAuthorization } from "../../helpers/general";

    export default {
        name: "login",
        data() {
            return {
                form: {
                    email: '',
                    password: ''
                },
                error: null
            };
        },
        methods: {
            authenticate() {
                this.$store.dispatch('auth/login');
                login({method: 'post', url: '/api/auth/login', params: this.$data.form})
                    .then((res) => {
                        setAuthorization(res.data.access_token);
                        this.$store.commit("auth/loginSuccess", res);
                        this.$router.push({path: '/'});
                    })
                    .catch((error) => {
                        this.$store.commit("auth/loginFailed", {error});
                    });
            }
        },
        mounted () {
        },
        computed: {
            authError() {
                return this.$store.getters['auth/authError'];
            }
        }
    }
</script>

<style scoped>
    .error {
        text-align: center;
        color: red;
    }
</style>
