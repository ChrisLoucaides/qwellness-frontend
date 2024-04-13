<template>
  <main v-motion-fade>
    <div v-if="userStore.user" v-motion-slide-bottom>
      <h1> 📝 <span>{{ userStore.user.first_name }}'s</span> Tasks</h1>
    </div>
    <div class="restrict-task-container">
      <div class="task-container" v-motion-pop-visible-once>
        <div v-if="loading">
          <p>Loading tasks...</p>
        </div>
        <div v-else>
          <div v-if="tasks.length">
            <h2 class="to-do-list-heading">To Do List</h2>
            <div class="flex-center">
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Create Task
              </button>
            </div>
            <hr>
            <div class="task-scroll-container" v-motion-slide-visible-bottom>
              <Task v-for="task in tasks" :key="task.id" :task="task" @edit-task="updateTask" v-motion-slide-top/>
            </div>
          </div>
          <div v-else>
            <div class="flex-center">
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Create Task
              </button>
            </div>
            <h3>No tasks available</h3>
          </div>
        </div>
      </div>
    </div>
  </main>

  <div>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from "../../auth.ts";
import Task from "../components/student-components/Task.vue";

const userStore = useUserStore()

const tasks = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8000/student-tasks/?username=' + userStore.user.username, {
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
  } finally {
    loading.value = false
  }
})

const task = ref({
  name: '',
  due_date: '',
  description: ''
})

const updateTask = async (taskId, updatedTaskDetails) => {
  try {
    const csrfToken = getCookie('csrftoken');
    const response = await fetch(`http://localhost:8000/edit-task/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      },
      credentials: "include",
      body: JSON.stringify(updatedTaskDetails)
    });
    if (response.ok) {
      console.log("Task updated successfully");
      await fetchTasks();
    } else {
      console.error('Failed to update task:', response.statusText);
    }
  } catch (error) {
    console.error('Error updating task:', error);
  }
  window.location.replace("http://localhost:5173/tasks");
};

const createTask = async () => {
  try {
    const csrfToken = getCookie('csrftoken');

    const response = await fetch('http://localhost:8000/new-task/', {
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
      window.location.replace("http://localhost:5173/tasks");
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

.task-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 700px;
  background-color: #A9B7C3;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 40px;
  padding: 20px;
  margin: 20px;
}

.restrict-task-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.to-do-list-heading {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.task-scroll-container {
  max-height: 450px;
  overflow-y: auto;
  margin-top: 10px;
}

.task-scroll-container::-webkit-scrollbar {
  width: 0.5em;
}

.task-scroll-container::-webkit-scrollbar-track {
  background: #A9B7C3;
}

.task-scroll-container::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 6px;
}

.task-scroll-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}

main {
  background-image: url('../assets/advisor-background.jpeg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
