<template>
    <div>
        <div id="main">
            <Header/>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from './Header.vue'

    export default {
        name: 'Main-App',
        components: { Header }
    }
</script>