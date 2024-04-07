// Task.vue

<template>
  <div class="task">
    <div class="card text-white bg-primary mb-3" style="max-width: 50rem;">
      <div class="card-header"><h3>{{ task.name }}</h3></div>
      <div class="card-body">
        <h5 class="card-title"><p>Due: {{ task.due_date }}</p></h5>
        <p class="card-text"> Description: {{ task.description }}</p>
      </div>
    </div>
  </div>

</template>

<script setup>
import {defineProps} from 'vue'

const props = defineProps({
  task: Object
})
</script>

<style scoped>
</style>
