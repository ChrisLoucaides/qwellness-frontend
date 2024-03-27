<template>
  <div class="list-of-students">
    <div>
      <div v-motion-slide-visible-top>
        <h1>Your Students 🧑‍🎓</h1>
        <hr>
      </div>
      <StudentListComponent></StudentListComponent>
    </div>
  </div>
</template>

<script setup>
import StudentListComponent from "../components/StudentListComponent.vue";
</script>

<style scoped>

.list-of-students {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100vh;
}

</style>