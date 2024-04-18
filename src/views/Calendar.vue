<template>
  <main v-motion-fade>
    <div v-if="userStore.user" v-motion-slide-bottom>
      <h1> 📅 <span>{{ userStore.user.first_name }}'s</span> Calendar</h1>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createMeeting">
        Schedule Meeting
        <span class="material-icons add-circle">add_circle</span>
      </button>
    </div>
    <div class="restrict-task-container">
    </div>
  </main>

  <div>
    <div class="modal fade" id="createMeeting" tabindex="-1" aria-labelledby="createMeetingLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="createMeetingLabel">Meeting with {{ userStore.user.advisor }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="scheduleMeeting">
              <div class="mb-3">
                <label for="dueDate" class="form-label">Meeting Date</label>
                <input type="date" class="form-control" id="dueDate" v-model="meeting.meeting_date">
              </div>
              <div class="mb-3">
                <label for="dueDate" class="form-label">Time</label>
                <input type="time" class="form-control" id="dueDate" v-model="meeting.meeting_time">
              </div>
              <button type="submit" class="btn btn-primary">Schedule Meeting</button>
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
const loading = ref(true)

const meeting = ref({
  meeting_date: '',
  meeting_time: '',
})

const scheduleMeeting = async () => {
  try {
    const csrfToken = getCookie('csrftoken');
    const response = await fetch('http://localhost:8000/advisor-meeting-for-student/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      },
      credentials: "include",
      body: JSON.stringify({
        id: userStore.user.id,
        date: meeting.value.meeting_date,
        time: meeting.value.meeting_time,
      })
    })
    if (response.ok) {
      const data = await response.json()
      console.log('Meeting scheduled:', data)
      const modal = bootstrap.Modal.getInstance(document.getElementById('createMeeting'))
      modal.hide()
    } else {
      console.error('Failed to schedule meeting:', response.statusText)
    }
  } catch (error) {
    console.error('An error occurred:', error)
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


.restrict-task-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-circle {
  position: relative;
  top: 0.25em;
  color: white;
}

main {
  background-image: url('../assets/advisor-background.jpeg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
