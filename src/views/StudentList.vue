<template>
  <div class="list-of-students">
    <div>
      <div class="student-list-header" v-motion-slide-visible-top>
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
  width: 100%;
  height: 100vh;
  background-image: url('../assets/advisor-background.jpeg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.student-list-header {
  text-align: center;
}

</style>