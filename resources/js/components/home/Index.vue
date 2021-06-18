<template>
	<div class="pricing-header mx-auto text-center">
      <h1 class="display-4">Demo laravel vuex</h1>
      <p class="lead">Laravel + VueX + Json web token</p>
      <p class="lead"> Account seeder<br>
        email: admin@gmail.com<br>
        password: admin<br>
      </p>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        computed: {
        	welcome() {
        		return 'welcome';
        	}
        }
    }
</script>