<script setup>
import {onMounted} from 'vue'
import {useUserStore} from "../../auth.ts";

const userStore = useUserStore()

onMounted(async () => {
  await userStore.fetchUser()
})
</script>

<template>

  <div v-if="userStore.user" className="greeting-container">
    <h1>Good Afternoon, <br> <span>{{ userStore.user.first_name }}!</span></h1>
  </div>

</template>

<style scoped>
span {
  color: #2e89c9;
}

.greeting-container {
  text-align: center;
  margin: 11em;
  font-size: 1.6em;
}
</style>
