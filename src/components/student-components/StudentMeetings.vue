<template>
  <div>
    <br>
    <div class="scrollable-column" v-motion-slide-right>
      <h2><strong>Upcoming Meetings</strong></h2>
      <hr>
      <div v-if="upcomingMeetings.length === 0">No upcoming meetings</div>
      <div class="meeting-card" v-for="meeting in upcomingMeetings" :key="meeting.id" v-motion-slide-visible-bottom>
        <div class="card text-white bg-primary mb-3" style="max-width: 40rem;">
          <div class="card-body text-left">
            <div class="meeting-info">
              <h3 class="card-title">{{ formatDate(meeting.date) }}, {{ formatTime(meeting.time) }}</h3>
              <h3 class="card-text"> Meeting with {{ getAdvisorFirstName(userStore.user.advisor) }}</h3>
            </div>
            <a href="https://teams.microsoft.com/" target="_blank">
              <img class="teams-logo" src="../../assets/teams-logo.png" alt="teams logo">
            </a>
          </div>
          <button @click="deleteMeeting(meeting.id)" class="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
    <div class="scrollable-column" v-motion-slide-left>
      <h2><strong>Past Meetings</strong></h2>
      <hr>
      <div v-if="pastMeetings.length === 0">No past meetings</div>
      <div class="meeting-card" v-for="meeting in pastMeetings" :key="meeting.id" v-motion-slide-visible-bottom>
        <div class="card text-white bg-secondary mb-3" style="max-width: 40rem;">
          <div class="card-body text-left">
            <div class="meeting-info">
              <h3 class="card-title">{{ formatDate(meeting.date) }} at {{ formatTime(meeting.time) }}</h3>
              <h3 class="card-text"> Meeting with {{ getAdvisorFirstName(userStore.user.advisor) }}</h3>
            </div>
            <a href="https://teams.microsoft.com/" target="_blank">
              <img class="teams-logo" src="../../assets/teams-logo.png" alt="teams logo">
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useUserStore } from "../../../auth";

const meetings = ref([]);
const userStore = useUserStore();

onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:8000/student-meetings/?id=${userStore.user.id}`, {
      method: 'GET',
      credentials: 'include'
    });

    if (response.ok) {
      const data = await response.json();
      meetings.value = data.meetings;
    } else {
      console.error('Failed to fetch meetings:', response.statusText);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
});

const deleteMeeting = async (meetingId) => {
  try {
    const csrfToken = getCookie('csrftoken');
    const response = await fetch(`http://localhost:8000/remove-meeting/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      },
      credentials: "include",
      body: JSON.stringify({ id: meetingId })
    });

    if (response.ok) {
    } else {
      console.error('Failed to delete meeting:', response.statusText);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};



const today = new Date();
const upcomingMeetings = ref([]);
const pastMeetings = ref([]);

watch(meetings, (newMeetings) => {
  upcomingMeetings.value = newMeetings.filter(meeting => {
    const meetingDate = new Date(meeting.date);
    return meetingDate >= today;
  });

  pastMeetings.value = newMeetings.filter(meeting => {
    const meetingDate = new Date(meeting.date);
    return meetingDate < today;
  });
});

const formatTime = (time) => {
  const parsedTime = new Date(`1970-01-01T${time}`);
  return parsedTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
};

const formatDate = (date) => {
  const parsedDate = new Date(date);
  const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' };
  return parsedDate.toLocaleDateString('en-UK', options);
};

const getAdvisorFirstName = (advisorUsername) => {
  const firstName = advisorUsername.split(/(?=[A-Z][a-z])/)[0];
  return firstName;
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

</script>

<style scoped>
.scrollable-column {
  display: inline-block;
  vertical-align: top;
  overflow-y: auto;
  max-height: 400px;
  background-color: #A9B7C3;
  padding: 10px;
  border-radius: 3em;
  margin-right: 20px;
  width: 35em;
  text-align: center;
}

.meeting-card {
  display: inline-block;
  margin: 10px;
  width: 30em;
}

.card {
  max-width: 40rem;
  border-radius: 1em;
  text-align: left;
}

.teams-logo {
  position: absolute;
  top: 3.2em;
  right: 1em;
  width: 3em;
  transition: filter 0.3s ease;
}

.meeting-info {
  display: inline-block;
  vertical-align: middle;
}

.teams-logo:hover {
  filter: brightness(0.8);
}
</style>
