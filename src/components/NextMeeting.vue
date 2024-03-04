<template>
  <div class="meeting-pill">
    <div class="meeting-pill-text">
      Your next meeting with <span> {{ userStore.user.advisor }} </span> is on
      <br>
      <span>05/03/2023 at 3PM</span>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "../../auth.ts";

const userStore = useUserStore();
</script>

<style scoped>
.meeting-pill {
  background: rgba(184, 222, 225, 0.8);
  color: #032734;
  padding: 1rem 2rem;
  border-radius: 60px;
  display: block;
  font-family: 'Arial', sans-serif;
  font-size: 3em;
  font-weight: bold;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  text-align: center;
  max-width: 100%;
  margin: 0;
}

.meeting-pill-text {
  opacity: 1;
  position: relative;
  z-index: 1;
}

span {
  color: #3055a4;
}
</style>
