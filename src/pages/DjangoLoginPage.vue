<template>
  <div>
    <h2>Redirecting to login...</h2>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'DjangoLoginPage',
  beforeRouteEnter(_to, _from, _next) {
    window.location.href = 'http://localhost:8000/login/';
  },
});
</script>

<style scoped>
</style>
