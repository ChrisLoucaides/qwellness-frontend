<script setup>
import {onMounted} from 'vue';
import {useUserStore} from '../../auth.ts';

const userStore = useUserStore();


onMounted(async () => {
  await userStore.fetchUser();
});
</script>

<template>
  <div v-if="userStore.user" v-motion-slide-top>
    <h1>👋 Hi <span>{{ userStore.user.first_name }}!</span></h1>
  </div>
</template>


<style scoped>
span {
  color: #076fb0;
}

h1 {
  font-size: 3em;
}
</style>