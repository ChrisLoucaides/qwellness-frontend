<template>
  <div class="task" v-if="isVisible">
    <div class="card text-white bg-primary mb-3" style="max-width: 50rem;">
      <div class="card-header"><h3>{{ task.name }}</h3></div>
      <div class="card-body">
        <h5 class="card-title"><p>Due: {{ task.due_date }}</p></h5>
        <p class="card-text"> Description: {{ task.description }}</p>

        <div>
          <button type="button" class="btn btn-warning" @click="openEditModal" data-bs-toggle="modal"
                  :data-bs-target="'#editTaskModal_' + task.id">Edit Task
          </button>
          <button type="button" class="btn btn-danger" @click="deleteTaskAndHide">Delete Task</button>
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
          <button type="button" class="btn btn-primary" :disabled="!buttonEnabled" @click="saveTaskChanges">Save
            Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, onMounted, ref, toRefs, defineEmits} from 'vue';

const props = defineProps({
  task: Object
})

const {task} = toRefs(props);
const editedTask = ref({...task.value});
const buttonEnabled = ref(false);
const isVisible = ref(true); // Initially visible
const emit = defineEmits(['edit-task'])

const openEditModal = () => {
};

const deleteTaskAndHide = async () => {
  await deleteTask();
  isVisible.value = false;
};

const saveTaskChanges = () => {
  emit('edit-task', task.value.id, editedTask.value);
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const deleteTask = async () => {
  try {
    const csrfToken = getCookie('csrftoken');
    const response = await fetch(`http://localhost:8000/complete-task/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      },
      credentials: "include",
      body: JSON.stringify({ id: task.value.id })
    });
    if (response.ok) {
      console.log("Task deleted successfully");
    } else {
      console.error('Failed to delete task:', response.statusText);
    }
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

onMounted(() => {
  setTimeout(() => {
    buttonEnabled.value = true;
  }, 3000);
  document.body.appendChild(document.getElementById('editTaskModal_' + task.value.id));
});
</script>

<style scoped>
</style>
