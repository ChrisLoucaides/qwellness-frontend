<template>
  <main class="home-page" :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
    <div class="main">
      <Greeting></Greeting>
      <NextMeeting></NextMeeting>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Greeting from "../components/Greeting.vue";
import NextMeeting from "../components/NextMeeting.vue";
import morningImage from '../assets/morning.png';
import eveningImage from '../assets/evening.png';
import aftennoonImage from '../assets/afternoon.png';

const backgroundImage = ref(morningImage);

function updateBackgroundImage() {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) {
    backgroundImage.value = morningImage;
  } else if (hour >= 12 && hour < 18) {
    backgroundImage.value = aftennoonImage;
  } else {
    backgroundImage.value = eveningImage;
  }
}

onMounted(() => {
  updateBackgroundImage();
});
</script>

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
