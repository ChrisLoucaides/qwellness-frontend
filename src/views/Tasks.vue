<script setup>
import {onMounted} from 'vue'
import {useUserStore} from "../../auth.ts";

const userStore = useUserStore()

onMounted(async () => {
  await userStore.fetchUser()
})
</script>

<template>
  <main>
    <div v-if="userStore.user">
      <h1> 📝 <span>{{ userStore.user.first_name }}'s</span> Tasks</h1>
    </div>
  </main>
</template>


<style scoped>
span {
  color: #076fb0;
}
</style>