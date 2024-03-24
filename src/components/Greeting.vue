<script setup>
import { onMounted, ref, computed } from 'vue';
import { useUserStore } from '../../auth.ts';

const userStore = useUserStore();
const currentTime = ref(new Date());

onMounted(async () => {
  await userStore.fetchUser();
});

const getGreeting = computed(() => {
  const hour = currentTime.value.getHours();
  if (hour < 12) {
    return 'Good Morning';
  } else if (hour < 18) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
});
</script>

<template>
  <div v-if="userStore.user" class="greeting-container" v-motion-roll-visible-top>
    <h1>{{ getGreeting }}, <br> <span>{{ userStore.user.first_name }}!</span></h1>
  </div>
</template>

<style scoped>
span {
  color: #076fb0;
}

.greeting-container {
  text-align: center;
  margin: 11em;
  font-size: 1.6em;
}
</style>
