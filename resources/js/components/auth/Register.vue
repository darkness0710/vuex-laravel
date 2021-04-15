<template>
    <p>Register</p>
</template>

<script>
    import { login } from '../../helpers/auth';
    export default {
        name: "login",
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
