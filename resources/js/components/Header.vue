<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-right">
        <a class="navbar-brand" href="/">Laravel Vuex App</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <template v-if="!currentUser">
                <ul class="nav navbar-nav ml-auto">
                    <li>
                        <router-link to="/login" class="nav-link">Login</router-link>
                    </li>
                    <li>
                        <router-link to="/register" class="nav-link">Register</router-link>
                    </li>
                </ul>
            </template>
            <template v-else>
                <ul class="nav navbar-nav ml-auto">
                        <li class="nav-item" v-bind:class="activeNavigation('customers')">
                            <router-link to="/customers" class="nav-link">Customers</router-link>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{ currentUser.name }}
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a class="dropdown-item" href="#">My profile</a>
                                <a class="dropdown-item" href="#" @click.prevent="logout">Logout</a>
                            </div>
                        </li>
                    </ul>
                </template>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'headers',
        methods: {
            logout() {
                this.$store.commit('logout');
                this.$router.push('/login');
            },
            activeNavigation(path) {
                const searchPattern = new RegExp('^' + path);
                if (searchPattern.test(this.$router.currentRoute.path), this.$router.currentRoute.path) {
                    return 'active';
                }
            }
        },
        computed: {
            currentUser() {
                return this.$store.getters.currentUser;
            }
        }
    }
</script>