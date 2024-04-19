<template>
  <div>
    <h2>Upcoming Meetings</h2>
    <div v-for="meeting in meetings" :key="meeting.id">
      <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
        <div class="card-body">
          <h4 class="card-title">{{ formatDate(meeting.date) }} at {{ formatTime(meeting.time) }}</h4>
          <h4 class="card-text"> Meeting with {{ userStore.user.advisor }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useUserStore} from "../../../auth"

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

const formatTime = (time) => {
  const parsedTime = new Date(`1970-01-01T${time}`);
  return parsedTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
};

const formatDate = (date) => {
  const parsedDate = new Date(date);
  const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' };
  return parsedDate.toLocaleDateString('en-UK', options);
};
</script>

<style scoped>
.card {
  width: 300px;
}
</style>
