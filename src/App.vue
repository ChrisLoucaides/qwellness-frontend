<template>
  <div class="app">
    <StudentNavbar></StudentNavbar> <!--TODO: Add logic to check the type of user-->
    <router-view></router-view>
  </div>
</template>

<!--TODO: Create API class-->

<script setup>
import StudentNavbar from "./components/StudentNavbar.vue";
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