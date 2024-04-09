<template>
  <main v-motion-fade>
    <div v-if="userStore.user" v-motion-slide-bottom>
      <h1> 📝 <span>{{ userStore.user.first_name }}'s</span> Tasks</h1>
    </div>
    <div class="restrict-task-container">
      <div class="task-container" v-motion-pop-visible-once>
        <div v-if="tasks.length">
          <h2 class="to-do-list-heading">To  Do List</h2>
          <hr>
          <Task v-for="task in tasks" :key="task.id" :task="task" @edit-task="updateTask" v-motion-slide-top/>

        </div>
        <div v-else>
          <p>No tasks available</p>
        </div>
      </div>
    </div>
  </main>

  <div>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Create Task
    </button>

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
import {ref, onMounted} from 'vue'
import {useUserStore} from "../../auth.ts";
import Task from "../components/student-components/Task.vue";

const userStore = useUserStore()

const tasks = ref([])

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8000/get_student_tasks/?username=' + userStore.user.username, { //TODO FYP:26 Change endpoint to remove method name
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

const updateTask = async (taskId, updatedTaskDetails) => {
  try {
    const csrfToken = getCookie('csrftoken');
    const response = await fetch(`http://localhost:8000/update_task/${taskId}/`, { //TODO FYP:26 Change endpoints to remove method names
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
};

const createTask = async () => {
  try {
    const csrfToken = getCookie('csrftoken');

    const response = await fetch('http://localhost:8000/create_task/', { //TODO FYP:26 Change endpoint to remove method name
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
  max-height: 800px;
  overflow-y: auto;
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

.to-do-list-heading {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
</style>
