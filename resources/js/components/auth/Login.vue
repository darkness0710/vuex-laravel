<template>
    <div class="login row justify-content-center mt-50">
        <div class="col-md-4">
            <h1 v-if="showMessage">
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                  <strong>{{ message }}</strong>
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
            </h1>
            <div class="card">
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
                        <div class="form-group text-center row">
                            <input type="submit" value="Login" class="btn-block btn-primary">
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
        name: "auth-login",
        props: ['message'],
        data() {
            return {
                form: {
                    email: '',
                    password: ''
                },
                error: null,
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
            },
            showMessage() {
                return this.message && this.message.length > 0;
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
