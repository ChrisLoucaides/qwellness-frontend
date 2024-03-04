<script setup>
import { onMounted } from 'vue'
import { useUserStore} from "../../auth.ts";

const userStore = useUserStore()

onMounted(async () => {
  await userStore.fetchUser()
})
</script>

<template>
  <div v-if="userStore.user">
    Welcome, {{ userStore.user.username }}!
  </div>
</template>