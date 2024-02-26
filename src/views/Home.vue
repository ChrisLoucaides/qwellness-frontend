<template>
  <main class="home-page">
    <div class="main">
      <Greeting></Greeting>
      <NextMeeting></NextMeeting>
    </div>
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

.main {
}
</style>

<script setup>
import Greeting from "../components/Greeting.vue";
import NextMeeting from "../components/NextMeeting.vue";
</script>