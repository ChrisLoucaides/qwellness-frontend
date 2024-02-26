<template>
  <main class="home-page">
    <Greeting></Greeting>
  </main>
</template>

<style>
.home-page {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/morning.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  height: 100vh;
}
</style>
<script setup>
import Greeting from "../components/Greeting.vue";
</script>