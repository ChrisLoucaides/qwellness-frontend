<template>
  <div class="app">
    <template v-if="userStore.user && userStore.user.role === 'STUDENT'">
      <StudentNavbar></StudentNavbar>
    </template>
    <template v-else-if="userStore.user && userStore.user.role === 'ADVISOR'">
      <AdvisorNavbar></AdvisorNavbar>
    </template>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '../auth.ts';
import StudentNavbar from "./components/StudentNavbar.vue";
import AdvisorNavbar from "./components/AdvisorNavbar.vue";

const router = useRouter();
const userStore = useUserStore();

const checkAuthentication = async () => {
  await userStore.fetchUser();
  const isAuthenticated = !!userStore.user;
  if (!isAuthenticated) {
    router.push('/login');
  }
};

checkAuthentication();
</script>

<style lang="scss">
:root {
  --primary: #60a8ee;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 300px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira sans', sans-serif;
}

body {
  background: var(--light);
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.app {
  display: flex;

  main {
    flex: 1 1 0;
    padding: 2rem;

    @media (max-width: 1024px) {
      padding-left: 6rem;
    }
  }
}
</style>