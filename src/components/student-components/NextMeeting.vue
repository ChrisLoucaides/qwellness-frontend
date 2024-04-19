<template>
  <div class="meeting-pill" v-motion-slide-visible-bottom>
    <div v-if="nextMeeting" class="meeting-pill-text">
      Your next meeting with <span> {{ getAdvisorFirstName(userStore.user.advisor) }} </span> is on
      <br>
      <span>{{ formatDate(nextMeeting.date) }} </span> at <span>{{ formatTime(nextMeeting.time) }}</span>
    </div>
    <div v-else>
      No upcoming meetings
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from "../../../auth";

const userStore = useUserStore();
const nextMeeting = ref(null);

onMounted(async () => {
  const response = await fetch(`http://localhost:8000/student-meetings/?id=${userStore.user.id}`, {
    method: 'GET',
    credentials: 'include'
  });
  if (response.ok) {
    const data = await response.json();
    const meetings = data.meetings;
    const today = new Date();
    const upcomingMeetings = meetings.filter(meeting => new Date(meeting.date) >= today);
    upcomingMeetings.sort((a, b) => new Date(a.date) - new Date(b.date));
    nextMeeting.value = upcomingMeetings[0] || null;
  } else {
    console.error('Failed to fetch meetings:', response.statusText);
  }
});

const formatTime = (time) => new Date(`1970-01-01T${time}`).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
const formatDate = (date) => new Date(date).toLocaleDateString('en-UK', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' });
const getAdvisorFirstName = (advisorUsername) => advisorUsername.split(/(?=[A-Z][a-z])/)[0];
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