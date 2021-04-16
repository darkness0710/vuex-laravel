<template>
    <div>
        <div id="main">
            <Header/>
            <div class="content" style="margin-bottom: 120px;">
                <router-view></router-view>
            </div>
            <Footer/>
        </div>
    </div>
</template>

<script>
    import Header from './Header.vue'
    import Footer from './Footer.vue'

    export default {
        name: 'Main-App',
        components: { Header, Footer }
    }
</script>