<template>
  <div class="task">
    <div class="card text-white bg-primary mb-3" style="max-width: 50rem;">
      <div class="card-header"><h3>{{ task.name }}</h3></div>
      <div class="card-body">
        <h5 class="card-title"><p>Due: {{ task.due_date }}</p></h5>
        <p class="card-text"> Description: {{ task.description }}</p>

        <div>
          <button type="button" class="btn btn-warning" @click="openEditModal" data-bs-toggle="modal"
                  :data-bs-target="'#editTaskModal_' + task.id">Edit Task
          </button>
        </div>

      </div>
    </div>
  </div>

  <div class="modal fade" :id="'editTaskModal_' + task.id" tabindex="-1"
       aria-labelledby="'editTaskModalLabel_' + task.id" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" :id="'editTaskModalLabel_' + task.id">Edit Task</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="'taskName_' + task.id" class="form-label">Task Name</label>
            <input type="text" class="form-control" :id="'taskName_' + task.id" v-model="editedTask.name">
          </div>
          <div class="mb-3">
            <label for="'dueDate_' + task.id" class="form-label">Due Date</label>
            <input type="date" class="form-control" :id="'dueDate_' + task.id" v-model="editedTask.due_date">
          </div>
          <div class="mb-3">
            <label for="'description_' + task.id" class="form-label">Description</label>
            <textarea class="form-control" :id="'description_' + task.id" rows="3"
                      v-model="editedTask.description"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="saveTaskChanges">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, onMounted, ref, toRefs} from 'vue';

const props = defineProps({
  task: Object
})

const {task} = toRefs(props);
const editedTask = ref({...task.value});

const openEditModal = () => {
  $('#editTaskModal_' + task.value.id).modal('show');
};

const saveTaskChanges = () => {
  this.$emit('edit-task', task.value.id, editedTask.value);
};

onMounted(() => {
  document.body.appendChild(document.getElementById('editTaskModal_' + task.value.id));
});
</script>

<style scoped>
</style>
