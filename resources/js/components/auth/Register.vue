<template>
    <p>Register</p>
</template>

<script>
    import { login } from '../../helpers/auth';
    export default {
        name: "auth-register",
        data() {
            return {
                form: {
                    email: '',
                    password: '',
                    password_confirm: ''
                },
                error: null
            };
        },
        methods: {
        },
        computed: {
        }
    }
</script>

<style scoped>
</style>
