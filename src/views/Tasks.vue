<template>
  <main>
    <div v-if="userStore.user">
      <h1> 📝 <span>{{ userStore.user.first_name }}'s</span> Tasks</h1>
    </div>

    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Create Task
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Create Task</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createTask">
              <div class="mb-3">
                <label for="taskName" class="form-label">Task Name</label>
                <input type="text" class="form-control" id="taskName" v-model="task.name">
              </div>
              <div class="mb-3">
                <label for="dueDate" class="form-label">Due Date</label>
                <input type="date" class="form-control" id="dueDate" v-model="task.due_date">
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea class="form-control" id="description" rows="3" v-model="task.description"></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Save Task</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <!-- TODO: FYP-23 Style into a Task/Task List component -->
    <div v-if="tasks.length">
      <h2>Your Tasks:</h2>
      <ul>
        <li v-for="task in tasks" :key="task.id">
          {{ task.name }} - Due: {{ task.due_date }} {{task.description}}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No tasks available</p>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from "../../auth.ts";

const userStore = useUserStore()

const tasks = ref([])

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8000/get_student_tasks/?username=' + userStore.user.username, {
      method: 'GET',
      credentials: "include"
    })
    if (response.ok) {
      const data = await response.json()
      tasks.value = data.tasks
    } else {
      console.error('Failed to fetch tasks:', response.statusText)
    }
  } catch (error) {
    console.error('Error fetching tasks:', error)
  }
})

const task = ref({
  name: '',
  due_date: '',
  description: ''
})

const createTask = async () => {
  try {
    // Get CSRF token from cookie
    const csrfToken = getCookie('csrftoken');

    const response = await fetch('http://localhost:8000/create_task/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      },
      credentials: "include",
      body: JSON.stringify({
        username: userStore.user.username,
        name: task.value.name,
        due_date: task.value.due_date,
        description: task.value.description
      })
    })
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      task.value.name = ''
      task.value.due_date = ''
      task.value.description = ''
    } else {
      console.error('Failed to create task:', response.statusText)
    }
  } catch (error) {
    console.error('Error creating task:', error)
  }
}

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
</script>

<style scoped>
span {
  color: #076fb0;
}

h1 {
  font-weight: bold;
}
</style>
