<script setup>
import { ref, onMounted } from 'vue';
import {useUserStore} from "../../auth.ts";
import Greeting from "../components/Greeting.vue";
import NextMeeting from "../components/NextMeeting.vue";
import morningImage from '../assets/morning.png';
import eveningImage from '../assets/evening.png';
import afternoonImage from '../assets/afternoon.png';
import AdvisorGreeting from "../components/AdvisorGreeting.vue";
import ViewAdviseeList from "../components/ViewAdviseeList.vue";
import UpcomingMeetings from "../components/UpcomingMeetings.vue";


const backgroundImage = ref(morningImage);

const userStore = useUserStore()


onMounted(async () => {
  await userStore.fetchUser();
});


function updateBackgroundImage() {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) {
    backgroundImage.value = morningImage;
  } else if (hour >= 12 && hour < 18) {
    backgroundImage.value = afternoonImage;
  } else {
    backgroundImage.value = eveningImage;
  }
}

onMounted(() => {
  updateBackgroundImage();
});
</script>

<template>
  <main class="home-page" :style="{ backgroundImage: 'url(' + backgroundImage + ')' }" v-if="userStore.user.role === 'STUDENT'">
    <div class="main">
      <Greeting></Greeting>
      <NextMeeting></NextMeeting>
    </div>
  </main>

  <main class="" v-if="userStore.user.role === 'ADVISOR'">
      <AdvisorGreeting></AdvisorGreeting>
      <div class="main-components">
        <ViewAdviseeList></ViewAdviseeList>
        <UpcomingMeetings></UpcomingMeetings>
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

.main-components {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
}
</style>
